import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';

const deleteHobbie: Handler = async (event) => {
  console.log(event.pathParameters.id)
  return {
    statusCode: 204
  }
}

export const main = middyfy(deleteHobbie);
