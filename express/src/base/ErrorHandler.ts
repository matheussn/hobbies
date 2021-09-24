import { NextFunction, Request, Response } from 'express';
import { BadRequestException, NotFoundException } from "./exceptions";

export function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  let message = 'Something went wrong';
  let status = 500;

  switch (error.constructor) {
    case NotFoundException:
      status = 404
      message = error.message
      break;
    case BadRequestException:
      status = 400
      message = error.message
      break;
    default:
      message = error.message
      break;
  }
  response.status(status)
    .send({ status, message })
}
