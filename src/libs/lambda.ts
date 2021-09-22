import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { Handler } from "aws-lambda"
import { ErrorHandler } from "src/base/ErrorHandler"

export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(ErrorHandler)
}
