import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import userService from '../../../../services/UserService';

const deleteUser: Handler = async (event) => {
  await userService.deleteUser(event.pathParameters.id)
  return { statusCode: 204 }
}

export const main = middyfy(deleteUser);
