import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';

const updateHobbie: Handler = async (event) => {
  return {
    statusCode: 200,
    body: `Hello ${event.body.name}, welcome to the exciting Serverless world!`
  }
}

export const main = middyfy(updateHobbie);
