import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import userService from '../../../../services/users/UsersService';

const updateUser: Handler = async (event) => {
  const user = await userService.updateUser(event.pathParameters.id, { name: event.body.name })
  return {
    statusCode: 200,
    body: JSON.stringify(user)
  }
}

export const main = middyfy(updateUser);
