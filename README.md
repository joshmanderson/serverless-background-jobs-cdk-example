# Example serverless background jobs with CDK

This project was bootstrapped with CDK following instructions from: https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html

This CDK project creates:

- SNS Topic (jobs are sent here)
- SQS Queues (jobs move to the relevant SQS queue depending on the job name)
- SQS Dead Letter Queues (jobs that repeatedly fail move to the associated dead letter queue)
- Lambda Functions (jobs are processed here)
- CloudWatch Alarms (when a DLQ has > X failed jobs an alarm is triggered)

## Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
