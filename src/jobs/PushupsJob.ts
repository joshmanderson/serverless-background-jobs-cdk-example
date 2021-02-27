import { SQSEvent, Context } from "aws-lambda";

import { JobConfig, defaultJobConfig } from "../JobConfig";
import { parseJobParams } from "../JobUtils";

interface PushupsJobParams {
  pushupsRequired: number;
  shouldFail: boolean;
}

const pushupsJobConfig: JobConfig = {
  ...defaultJobConfig,
  name: "PushupsJob",
  maxAttempts: 3,
  failedJobCountForAlarm: 3, // Purposefully set low for testing purposes
};

async function processJob(event: SQSEvent, context: Context): Promise<void> {
  for (const record of event.Records) {
    const jobParams = parseJobParams<PushupsJobParams>(record);

    if (jobParams.shouldFail) {
      throw new Error("Job processing failed!");
    }

    let pushupsCompleted = 0;

    while (pushupsCompleted < jobParams.pushupsRequired) {
      pushupsCompleted++;

      console.log(`${pushupsCompleted}!`);
    }

    console.log("That was hard work!");
  }
}

export { PushupsJobParams, pushupsJobConfig, processJob };
