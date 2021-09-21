import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import userService from 'src/services/UserService';


const readUser: Handler = async () => {
  const users = await userService.getAllUsers()
  return { 
    statusCode: 200,
    body: JSON.stringify(users)
  }
}

export const main = middyfy(readUser);
