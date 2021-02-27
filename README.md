# Example serverless background jobs with CDK

This project was bootstrapped with CDK following instructions from: https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html

This CDK project creates:

- SNS Topic
- SQS Queue
- SQS Dead Letter Queue
- Lambda Function
- CloudWatch Alarm

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
