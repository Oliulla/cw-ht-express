import express, { Application, Request, Response, NextFunction } from "express"
import cors from "cors"
import routes from "./app/routes"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", routes)

// globally handle error
app.use(globalErrorHandler)

// caught api error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  })
  next()
})

export default app
