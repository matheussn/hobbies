import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import { UsersService } from '../../../../services/users/UsersService';

const usersService = new UsersService()

const updateUser: Handler = async (event) => {
  const user = await usersService.updateUser(event.pathParameters.userId, { name: event.body.name })
  return {
    statusCode: 200,
    body: JSON.stringify(user)
  }
}

export const main = middyfy(updateUser);
