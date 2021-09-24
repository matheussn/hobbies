import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import userService from '../../../../services/users/UsersService';

const createUser: Handler = async (event) => {
  const user = await userService.createUser({ name: event.body.name })

  return {
    statusCode: 201,
    body: JSON.stringify(user)
  }
}

export const main = middyfy(createUser);
