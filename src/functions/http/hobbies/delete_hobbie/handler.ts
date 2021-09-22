import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import hobbieService from 'src/services/HobbieService';

const deleteHobbie: Handler = async (event) => {
  const {userId, hobbieId} = event.pathParameters
  await hobbieService.deleteHobbie(userId, hobbieId)
  return { statusCode: 204 }
}

export const main = middyfy(deleteHobbie);
