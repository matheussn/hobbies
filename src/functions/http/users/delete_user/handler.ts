import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import userService from '../../../../services/users/UsersService';

const deleteUser: Handler = async (event) => {
  await userService.deleteUser(event.pathParameters.id)
  return { statusCode: 204 }
}

export const main = middyfy(deleteUser);
