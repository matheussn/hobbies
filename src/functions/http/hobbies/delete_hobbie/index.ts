import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'user/{id}',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
