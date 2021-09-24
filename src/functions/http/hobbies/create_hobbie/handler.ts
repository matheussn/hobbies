import { Handler } from 'aws-lambda';
import { BadRequestException } from '../../../../base/exceptions';
import middyfy from '../../../../libs/lambda';
import { HobbieService } from '../../../../services/hobbies/HobbiesService';

const hobbieService = new HobbieService()

function validBody(body: any): any {
  if(body == null)
    throw new BadRequestException("É necessário passar todos os campos no 'body'")
  if(body.name == null)
    throw new BadRequestException("Campo 'name' é obrigatório!")
  if(body.experienceLevel == null)
    throw new BadRequestException("Campo 'experienceLevel' é obrigatório!")
  if(body.year == null)
    throw new BadRequestException("Campo 'year' é obrigatório!")
  
  return body
}

const createHobbie: Handler = async (event) => {
  const { name, year, experienceLevel } = validBody(event.body)

  const hobbie = await hobbieService.createHobbie(event.pathParameters.userId, { name, year, experienceLevel })
  return {
    statusCode: 200,
    body: JSON.stringify(hobbie)
  }
}

export const main = middyfy(createHobbie);
