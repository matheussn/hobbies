import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import HobbieService from 'src/services/HobbieService';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const hobbies = await HobbieService.getAllHobbies(event.pathParameters.id)
  return formatJSONResponse({
    message: `Bora`,
    data: hobbies
  });
}

export const main = middyfy(hello);
