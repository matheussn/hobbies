import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import userService from '../../../../services/UserService';

const updateUser: Handler = async (event) => {
  const user = await userService.updateUser(event.pathParameters.id, { name: event.body.name })
  return {
    statusCode: 200,
    body: JSON.stringify(user)
  }
}

export const main = middyfy(updateUser);
