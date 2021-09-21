import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import userService from 'src/services/UserService';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const user = await userService.updateUser(event.pathParameters.id, { name: event.body.name })
  return formatJSONResponse({
    message: `Usuário atualizado com sucesso`,
    data: user
  });
}

export const main = middyfy(hello);
