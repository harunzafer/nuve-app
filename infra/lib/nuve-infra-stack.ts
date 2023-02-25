import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from "aws-cdk-lib";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from "aws-cdk-lib/aws-apigateway";
import path = require('path');

export class NuveInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Configure path to Dockerfile
    const dockerfile = path.join(__dirname, "../../backend/nuve-lambda");

    // Create AWS Lambda function and push image to ECR
    const lambda_function = new lambda.DockerImageFunction(this, "NuveLambda", {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
      timeout: Duration.seconds(30)
    });

    // defines an API Gateway REST API resource backed by our "lambda" function.
    const api = new apigw.LambdaRestApi(this, "NuveLambdaApi", {
      handler: lambda_function,
      proxy: false,
    });

    // /analyze
    const analyze = api.root.addResource("analyze");
    analyze.addMethod("POST");

    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

  }
}
