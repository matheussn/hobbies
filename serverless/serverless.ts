import { createHobbie, createUser, deleteHobbie, deleteUser, readHobbie, readUser, updateHobbie, updateUser } from './src/functions/index';
import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  org: 'matheussneto',
  app: 'hobbies',
  service: 'hobbies',
  frameworkVersion: '2',
  package: {
    individually: true,
  },
  plugins: ['serverless-offline', 'serverless-plugin-typescript'],
  provider: {
    name: 'aws',
    stage: '${prop:stage, "dev"}',
    runtime: 'nodejs14.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_ENV: '${prop:stage, "dev"}'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { createUser, deleteUser, updateUser, readUser, readHobbie, createHobbie, deleteHobbie, updateHobbie },
};

module.exports = serverlessConfiguration;
