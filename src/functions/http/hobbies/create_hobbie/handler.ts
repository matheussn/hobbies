import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import { HobbieService } from '../../../../services/hobbie/HobbieService';

const hobbieService = new HobbieService()

const createHobbie: Handler = async (event) => {
  const { name, year, experienceLevel } = event.body

  const hobbie = await hobbieService.createHobbie(event.pathParameters.id, { name, year, experienceLevel })
  return {
    statusCode: 200,
    body: JSON.stringify(hobbie)
  }
}

export const main = middyfy(createHobbie);
