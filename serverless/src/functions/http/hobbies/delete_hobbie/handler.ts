import { Handler } from 'aws-lambda';
import middyfy from '../../../../libs/lambda';
import { HobbieService } from '../../../../services/hobbies/HobbiesService';

const hobbieService = new HobbieService()

const deleteHobbie: Handler = async (event) => {
  const { userId, hobbieId } = event.pathParameters
  await hobbieService.deleteHobbie(userId, hobbieId)
  return { statusCode: 204 }
}

export const main = middyfy(deleteHobbie);
