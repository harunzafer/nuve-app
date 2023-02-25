import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Configure path to Dockerfile
    const dockerfile = path.join(__dirname, "../../backend/nuve-lambda");

    // Create AWS Lambda function and push image to ECR
    new lambda.DockerImageFunction(this, "function", {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
    });


  }
}