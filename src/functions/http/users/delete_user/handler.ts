import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import userService from 'src/services/UserService';

const deleteUser: Handler = async (event) => {
  await userService.deleteUser(event.pathParameters.id)
  return {
    statusCode: 204
  }
}

export const main = middyfy(deleteUser);
