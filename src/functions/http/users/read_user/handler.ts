import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import { UsersService } from '../../../../services/users/UsersService';

const usersService = new UsersService()

const readUser: Handler = async () => {
  const users = await usersService.getAllUsers()
  return {
    statusCode: 200,
    body: JSON.stringify(users)
  }
}

export const main = middyfy(readUser);
