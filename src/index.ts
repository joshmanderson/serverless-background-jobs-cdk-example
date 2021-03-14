import { jobConfig as greetingJobConfig } from "./jobs/GreetingJob";
import { jobConfig as pushupsJobConfig } from "./jobs/PushupsJob";
import { JobConfig } from "./JobConfig";

const jobConfigs: JobConfig[] = [greetingJobConfig, pushupsJobConfig];

export { jobConfigs };
