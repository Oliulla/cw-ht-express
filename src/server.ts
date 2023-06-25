import { Server } from "http"
import mongoose from "mongoose"
import app from "./app"
import config from "./config"
// import { errorlogger, logger } from "./shared/logger"

// Handle uncaught exceptions globally
process.on("uncaughtException", error => {
  console.log(error)

  // Terminate the process with an exit code of 1 (indicating an error)
  process.exit(1)
})

let server: Server

async function establishMongoDBConnection() {
  try {
    await mongoose.connect(config.db_url as string)

    if (mongoose.connection.readyState === 1) {
      console.log(`Database is established successfully`)

      server = app.listen(config.port, () => {
        console.log(`Cow Hat listening on port ${config.port}`)
      })
    } else {
      console.log("Failed to establish a connection to the database.")
    }
  } catch (error) {
    console.log("Failed to establish a connection to the database.")
  }

  // Handle unhandled promise rejections globally
  process.on("unhandledRejection", error => {
    if (server) {
      // If a server instance exists
      server.close(() => {
        // Close the server gracefully here

        console.log(error)

        // Terminate the process with an exit code of 1 (indicating an error)
        process.exit(1)
      })
    } else {
      // If no server instance exists
      process.exit(1)
    }
  })
}

establishMongoDBConnection()

// Handle SIGTERM signal
process.on("SIGTERM", () => {
  console.log("SIGTERM is received")
  if (server) {
    // Close the server gracefully if a server instance exists
    server.close()
  }
})
