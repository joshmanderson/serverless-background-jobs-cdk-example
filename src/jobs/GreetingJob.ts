import { SQSEvent, Context } from "aws-lambda";
import moment from "moment";

import { JobConfig, defaultJobConfig } from "../JobConfig";
import { parseJobParams } from "../JobUtils";

interface GreetingJobParams {
  friendName: string;
  shouldFail: boolean;
}

const greetingJobConfig: JobConfig = {
  ...defaultJobConfig,
  name: "GreetingJob",
  retryDelaySeconds: 15,
};

async function processJob(event: SQSEvent, context: Context): Promise<void> {
  for (const record of event.Records) {
    const jobParams = parseJobParams<GreetingJobParams>(record);

    if (jobParams.shouldFail) {
      throw new Error("Job processing failed!");
    }

    console.log(`${determineGreeting()} ${jobParams.friendName}!`);
  }
}

function determineGreeting(): string {
  const currentHour = moment().hour();

  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export { GreetingJobParams, greetingJobConfig, processJob };
