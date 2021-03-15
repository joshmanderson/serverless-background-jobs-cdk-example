import * as path from "path";

import {
  Construct,
  Stack,
  StackProps,
  Duration,
  CfnOutput,
} from "@aws-cdk/core";
import { Topic, SubscriptionFilter } from "@aws-cdk/aws-sns";
import { Queue } from "@aws-cdk/aws-sqs";
import { SqsSubscription } from "@aws-cdk/aws-sns-subscriptions";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { SqsEventSource } from "@aws-cdk/aws-lambda-event-sources";

import { jobConfigs } from "../src";
import { Alarm } from "@aws-cdk/aws-cloudwatch";

export class ServerlessBackgroundJobsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const snsTopicId = "BackgroundJobsTopic";

    // Create the SNS topic
    const snsTopic = new Topic(this, snsTopicId);

    // Create an output for the SNS topic ARN with a relevant export name so it can be imported and used in another stack (e.g. web application stack)
    new CfnOutput(this, `${snsTopicId}Output`, {
      value: snsTopic.topicArn,
      exportName: snsTopicId, // note that this export name must be unique across all of your CloudFormation stacks
    });

    for (const jobConfig of jobConfigs) {
      // Create the SQS dead letter queue for the job
      const sqsDeadLetterQueue = new Queue(this, `${jobConfig.name}DLQ`);

      // Create the SQS queue for the job
      const sqsQueue = new Queue(this, `${jobConfig.name}Queue`, {
        visibilityTimeout: Duration.seconds(jobConfig.retryDelaySeconds),
        deadLetterQueue: {
          queue: sqsDeadLetterQueue, // Utilize the SQS dead letter queue created above
          maxReceiveCount: jobConfig.maxAttempts,
        },
      });

      // Subscribe the SQS queue to the SNS topic
      snsTopic.addSubscription(
        new SqsSubscription(sqsQueue, {
          filterPolicy: {
            jobName: SubscriptionFilter.stringFilter({
              whitelist: [jobConfig.name],
            }),
          },
        })
      );

      // Create the lambda function for the job
      const lambdaFunction = new NodejsFunction(
        this,
        `${jobConfig.name}Function`,
        {
          entry: path.join("src", "jobs", `${jobConfig.name}.ts`),
          handler: "processJob",
          timeout: Duration.seconds(jobConfig.timeoutSeconds),
        }
      );

      // Add the SQS queue as an event source for the lambda function
      lambdaFunction.addEventSource(
        new SqsEventSource(sqsQueue, {
          batchSize: jobConfig.batchSize,
        })
      );

      // Create a CloudWatch alarm on the SQS dead letter queue
      new Alarm(this, `${jobConfig.name}FailureAlarm`, {
        metric: sqsDeadLetterQueue.metricApproximateAgeOfOldestMessage(),
        threshold: jobConfig.failedMessageAgeForAlarmSeconds,
        evaluationPeriods: 1,
      });
    }
  }
}
