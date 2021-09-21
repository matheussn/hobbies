import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import hobbieService from 'src/services/HobbieService';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { name, year, experienceLevel } = event.body

  const hobbie = await hobbieService.createHobbie(event.pathParameters.id, { name, year, experienceLevel })
  return formatJSONResponse({
    message: `Hobbie Criado com sucesso`,
    data: hobbie
  });
}

export const main = middyfy(hello);
