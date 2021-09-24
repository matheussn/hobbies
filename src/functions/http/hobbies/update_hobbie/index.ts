import { handlerPath } from '../../../../libs/handlerResolver';
import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 30,
  events: [
    {
      http: {
        method: 'put',
        path: 'user/{userId}/hobbie/{hobbieId}',
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
