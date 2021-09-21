import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import userService from 'src/services/UserService';

const createUser: Handler = async (event) => {
  const user = await userService.createUser({ name: event.body.name })

  return {
    statusCode: 201,
    body: JSON.stringify(user)
  }
}

export const main = middyfy(createUser);
