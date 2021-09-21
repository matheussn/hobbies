import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import hobbieService from 'src/services/HobbieService';


const createHobbie: Handler = async (event) => {
  const { name, year, experienceLevel } = event.body

  const hobbie = await hobbieService.createHobbie(event.pathParameters.id, { name, year, experienceLevel })
  return {
    statusCode: 200,
    body: JSON.stringify(hobbie)
  }
}

export const main = middyfy(createHobbie);
