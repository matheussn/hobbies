import { BadRequestException, NotFoundException } from "./exceptions";

export const ErrorHandler = {
  onError: (handler) => {
    switch (handler.error.constructor) {
      case NotFoundException:
        handler.response = defaultResponse(404, handler.error.message)
        break;
      case BadRequestException:
        handler.response = defaultResponse(400, handler.error.message)
        break;
      default:
        handler.response = defaultResponse(500, handler.error.message)
        break;
    }

    return Promise.resolve();
  }
}

function defaultResponse(status: number, message: string) {
  return { statusCode: status, body: JSON.stringify({ error: message }) }
}
