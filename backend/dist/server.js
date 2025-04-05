"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const connect_to_database_1 = require("./database/connect-to-database");
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", products_routes_1.default);
app.use("/api", users_routes_1.default);
app.listen(env_1.port, '0.0.0.0', () => {
    (0, connect_to_database_1.connectToDatabase)();
    console.log(`Server is listen on ${env_1.port}`);
});
exports.default = app;
