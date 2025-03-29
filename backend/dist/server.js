"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const connect_to_database_1 = require("./utils/connect-to-database");
const app = (0, express_1.default)();
app.listen(8000, () => {
    (0, connect_to_database_1.connectToDatabase)();
    console.log(`Server is listen on ${env_1.port}`);
});
exports.default = app;
