/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import ApiError from "../../errors/ApiError"

// import { errorlogger } from "../../shared/logger"
import { IGenericErrorMessage } from "../../interface/error"
import config from "../../config"
import handleValidationError from "../../errors/handleValidationError"
import handleCastError from "../../errors/handleCastError"

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === "development"
    ? console.log(`globalErrorHandler -->`, { error })
    : console.log(`globalErrorHandler -->F`, error)

  let statusCode = 500
  let message = "Something went wrong !"
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === "ValidationError") {
    const errorSample = handleValidationError(error)
    statusCode = errorSample.statusCode
    message = errorSample.message
    errorMessages = errorSample.errorMessages
  } else if (error?.name === "CastError") {
    const errorSample = handleCastError(error)
    statusCode = errorSample.statusCode
    message = errorSample.message
    errorMessages = errorSample.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  })
}

export default globalErrorHandler
