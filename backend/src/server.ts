import app from './app';
import { port } from './config/system/env.config';
import { connectToDatabase } from './config/system/connect-to-database.config';
import https from 'https';
import { sslCredentials } from './config/system/ssl-credentials.config';
import { isProduction, isRender } from './config/system/env.config';
import http from "http";
import logger from './config/libraries/winston.config';

if (isProduction && isRender) {
    http.createServer(app).listen(port, '0.0.0.0', () => {
        connectToDatabase();
        logger.info(`Server is listening on port ${port} in render production mode`);
    });
  } else {
    https.createServer(sslCredentials, app).listen(port, '0.0.0.0', () => {
        connectToDatabase();
        logger.info(`Server is listening on port ${port} in development mode`);
    });
  }

export default app;