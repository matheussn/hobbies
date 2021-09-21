import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import userService from 'src/services/UserService';
import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const users = await userService.getAllUsers()
  return formatJSONResponse({data: users});
}

export const main = middyfy(hello);
