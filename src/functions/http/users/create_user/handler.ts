import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import request from './schema';
import userService from 'src/services/UserService';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof request> = async (event) => {
  const user = await userService.createUser({
    name: event.body.name,
    hobbies: []
  })

  return formatJSONResponse({
    message: `Usuário criado com sucesso`,
    data: user
  })
}

export const main = middyfy(hello);
