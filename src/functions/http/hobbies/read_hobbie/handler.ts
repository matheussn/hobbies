import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import { HobbieService } from '../../../../services/hobbies/HobbiesService';

const hobbieService = new HobbieService()

const readHobbie: Handler = async (event) => {
  const hobbies = await hobbieService.getAllHobbies(event.pathParameters.id)
  return {
    statusCode: 200,
    body: JSON.stringify(hobbies)
  }
}

export const main = middyfy(readHobbie);
