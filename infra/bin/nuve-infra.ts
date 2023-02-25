#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NuveInfraStack } from '../lib/nuve-infra-stack';

const app = new cdk.App();
new NuveInfraStack(app, 'NuveInfraStack');
