import { SQSEvent, Context } from "aws-lambda";

import { JobConfig, defaultJobConfig } from "../JobConfig";
import { parseJobParams } from "../JobUtils";

interface PushupsJobParams {
  pushupsRequired: number;
  shouldFail: boolean;
}

const jobConfig: JobConfig = {
  ...defaultJobConfig,
  name: "PushupsJob", // This must match the name of the file
  maxAttempts: 3,
  failedMessageAgeForAlarmSeconds: 600, // 10 minutes
};

async function processJob(event: SQSEvent, context: Context): Promise<void> {
  for (const record of event.Records) {
    const jobParams = parseJobParams<PushupsJobParams>(record);

    // Included for testing purposes
    if (jobParams.shouldFail) {
      throw new Error("Job processing failed!");
    }

    let pushupsCompleted = 0;

    while (pushupsCompleted < jobParams.pushupsRequired) {
      pushupsCompleted++;

      // Logs "1!", "2!", "3!" etc.
      console.log(`${pushupsCompleted}!`);
    }

    console.log("That was hard work!");
  }
}

export { jobConfig, processJob };
