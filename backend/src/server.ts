import app from './app';
import { port } from './config/system/env.config';
import { connectToDatabase } from './config/system/connect-to-database.config';
import path from "path";
import https from 'https';
import { sslCredentials } from './config/system/ssl-credentials';
import { isProduction } from './config/system/env.config';
import http from "http";

export const reactAppBuildPath = path.join(__dirname, "../../frontend/dist/");
export const indexHtmlPath = path.join(reactAppBuildPath, "index.html");

if (isProduction) {
    http.createServer(app).listen(port, '0.0.0.0', () => {
        connectToDatabase();
        console.log(`Server is listening on port ${port} in production mode`);
    });
  } else {
    https.createServer(sslCredentials, app).listen(port, '0.0.0.0', () => {
        connectToDatabase();
        console.log(`Server is listening on port ${port} in development mode`);
    });
  }

export default app;