import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'user/{userId}/hobbie/{hobbieId}',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
