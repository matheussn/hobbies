import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import { UsersService } from '../../../../services/users/UsersService';

const usersService = new UsersService()

const deleteUser: Handler = async (event) => {
  await usersService.deleteUser(event.pathParameters.userId)
  return { statusCode: 204 }
}

export const main = middyfy(deleteUser);
