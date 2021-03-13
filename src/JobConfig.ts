interface JobConfig {
  name: string;
  timeoutSeconds: number;
  batchSize: number;
  maxAttempts: number;
  retryDelaySeconds: number;
  failedMessageAgeForAlarmSeconds: number;
}

interface DefaultJobConfig {
  maxAttempts: number;
  timeoutSeconds: number;
  batchSize: number;
  retryDelaySeconds: number;
  failedMessageAgeForAlarmSeconds: number;
}

const defaultJobConfig: DefaultJobConfig = {
  maxAttempts: 5,
  timeoutSeconds: 15,
  batchSize: 5,
  retryDelaySeconds: 30,
  failedMessageAgeForAlarmSeconds: 900, // 15 minutes
};

export { JobConfig, defaultJobConfig };
