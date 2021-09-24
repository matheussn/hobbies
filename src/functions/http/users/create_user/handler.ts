import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import { UsersService } from '../../../../services/users/UsersService';

const usersService = new UsersService()

const createUser: Handler = async (event) => {
  const user = await usersService.createUser({ name: event.body.name })

  return {
    statusCode: 201,
    body: JSON.stringify(user)
  }
}

export const main = middyfy(createUser);
