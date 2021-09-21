import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import userService from 'src/services/UserService';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await userService.deleteUser(event.pathParameters.id)
  return formatJSONResponse({
    message: `Usuário deletado`
  });
}

export const main = middyfy(hello);
