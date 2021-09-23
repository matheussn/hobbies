import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import userService from '../../../../services/UserService';

const createUser: Handler = async (event) => {
  const user = await userService.createUser({ name: event.body.name })

  return {
    statusCode: 201,
    body: JSON.stringify(user)
  }
}

export const main = middyfy(createUser);
