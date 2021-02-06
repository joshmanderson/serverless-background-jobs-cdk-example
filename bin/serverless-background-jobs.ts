#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessBackgroundJobsStack } from '../lib/serverless-background-jobs-stack';

const app = new cdk.App();
new ServerlessBackgroundJobsStack(app, 'ServerlessBackgroundJobsStack');
