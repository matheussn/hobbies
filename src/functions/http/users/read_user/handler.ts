import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import userService from '../../../../services/users/UsersService';


const readUser: Handler = async () => {
  const users = await userService.getAllUsers()
  return {
    statusCode: 200,
    body: JSON.stringify(users)
  }
}

export const main = middyfy(readUser);
