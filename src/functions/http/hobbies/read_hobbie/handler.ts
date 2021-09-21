import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import HobbieService from 'src/services/HobbieService';

const readHobbie: Handler = async (event) => {
  const hobbies = await HobbieService.getAllHobbies(event.pathParameters.id)
  return {
    statusCode: 200,
    body: JSON.stringify(hobbies)
  }
}

export const main = middyfy(readHobbie);
