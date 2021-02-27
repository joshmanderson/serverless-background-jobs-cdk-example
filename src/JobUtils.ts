import { SQSRecord, SNSMessage } from "aws-lambda";

function parseJobParams<T>(record: SQSRecord): T {
  const snsMessage = JSON.parse(record.body) as SNSMessage;
  return JSON.parse(snsMessage.Message);
}

export { parseJobParams };
