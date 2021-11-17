import type { AWS } from "@serverless/typescript";

import hello from "@functions/addBook";
import orderBook from "@functions/getBook";
import deleteBook from "@functions/deleteBook";

const serverlessConfiguration: AWS = {
  service: "aws-composit-key",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  resources: {
    Resources: {
      organizationTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Library-Table",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "authorName",
              AttributeType: "S",
            },
            {
              AttributeName: "bookName",
              AttributeType: "S",
            },
            {
              AttributeName: "price",
              AttributeType: "N",
            },
            {
              AttributeName: "availibilty",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "authorName",
              KeyType: "HASH",
            },
            {
              AttributeName: "bookName",
              KeyType: "RANGE",
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "AvailibilityPriceIndex",
              KeySchema: [
                {
                  AttributeName: "availibilty",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "price",
                  KeyType: "RANGE",
                },
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
          ],
        },
      },
    },
  },
  // import the function via paths
  functions: { hello, orderBook, deleteBook },
};

module.exports = serverlessConfiguration;
