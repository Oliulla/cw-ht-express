"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
// import { errorlogger, logger } from "./shared/logger"
// Handle uncaught exceptions globally
process.on("uncaughtException", error => {
    console.log(error);
    // Terminate the process with an exit code of 1 (indicating an error)
    process.exit(1);
});
let server;
function establishMongoDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            if (mongoose_1.default.connection.readyState === 1) {
                console.log(`Database is established successfully`);
                server = app_1.default.listen(config_1.default.port, () => {
                    console.log(`Cow Hat listening on port ${config_1.default.port}`);
                });
            }
            else {
                console.log("Failed to establish a connection to the database.");
            }
        }
        catch (error) {
            console.log("Failed to establish a connection to the database.");
        }
        // Handle unhandled promise rejections globally
        process.on("unhandledRejection", error => {
            if (server) {
                // If a server instance exists
                server.close(() => {
                    // Close the server gracefully here
                    console.log(error);
                    // Terminate the process with an exit code of 1 (indicating an error)
                    process.exit(1);
                });
            }
            else {
                // If no server instance exists
                process.exit(1);
            }
        });
    });
}
establishMongoDBConnection();
// Handle SIGTERM signal
process.on("SIGTERM", () => {
    console.log("SIGTERM is received");
    if (server) {
        // Close the server gracefully if a server instance exists
        server.close();
    }
});
