interface JobConfig {
  name: string;
  maxAttempts: number;
  retryDelaySeconds: number;
  failedJobCountForAlarm: number;
}

interface DefaultJobConfig {
  maxAttempts: number;
  retryDelaySeconds: number;
  failedJobCountForAlarm: number;
}

const defaultJobConfig: DefaultJobConfig = {
  maxAttempts: 5,
  retryDelaySeconds: 30,
  failedJobCountForAlarm: 2, // Purposefully set low for testing purposes
};

export { JobConfig, defaultJobConfig };
