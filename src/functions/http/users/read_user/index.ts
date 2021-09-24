import { handlerPath } from '../../../../libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 30,
  events: [
    {
      http: {
        method: 'get',
        path: 'user',
      }
    }
  ]
}
