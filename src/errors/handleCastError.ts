import mongoose from "mongoose"
import { IGenericErrorMessage } from "../interface/error"

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: "Invalid id",
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: "Cast Error found",
    errorMessages: errors,
  }
}

export default handleCastError
