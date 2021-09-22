import { createHobbie, createUser, deleteHobbie, deleteUser, readHobbie, readUser, updateHobbie, updateUser } from '@functions/index';
import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  service: 'hobbies',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { createUser, deleteUser, updateUser, readUser, readHobbie, createHobbie, deleteHobbie, updateHobbie },
};

module.exports = serverlessConfiguration;
