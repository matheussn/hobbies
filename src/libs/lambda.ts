import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { Handler } from "aws-lambda"
import { ErrorHandler } from "../base/ErrorHandler"

export default (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(ErrorHandler)
}
