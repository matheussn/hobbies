import { Handler } from 'aws-lambda';
import { BadRequestException } from '../../../../base/exceptions';
import middyfy from '../../../../libs/lambda';
import { HobbieService } from '../../../../services/hobbies/HobbiesService';

const hobbieService = new HobbieService()

const updateHobbie: Handler = async (event) => {
  const { name, year, experienceLevel } = event.body

  if (name == null && year == null && experienceLevel == null) {
    throw new BadRequestException(`É necessário enviar pelo menos um dos campos do Hobbie para ser alterado`)
  }

  const newHobbie = await hobbieService.updatehobbie(event.pathParameters.hobbieId, { name, year, experienceLevel })

  return {
    statusCode: 200,
    body: JSON.stringify(newHobbie)
  }
}

export const main = middyfy(updateHobbie);
