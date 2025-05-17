import winston, { Logger } from 'winston';
import 'winston-mongodb';
import { databaseUri } from '@config/system/env.config';

/**
 * Winston logger configuration.
 * 
 * This logger is responsible for recording application logs to multiple destinations:
 * - Console: for immediate feedback during development.
 * - File logs:
 *   - `logs/error.log`: stores only logs at level `error` and above.
 *   - `logs/combined.log`: stores all logs (`info`, `warn`, `error`, etc.).
 * - MongoDB:
 *   - Logs errors to the `log_errors` collection in the connected database.
 * 
 * MongoDB transport is useful for centralized log aggregation, especially in production.
 * 
 * Log Format:
 *   - Each log includes a timestamp, log level (in uppercase), and the message content.
 * 
 * Environment:
 *   - MongoDB URI is read from `databaseUri` in the environment config.
 * 
 * Example Output:
 *   2025-05-16T14:55:23.123Z [ERROR]: User login failed due to invalid credentials
*/

const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.MongoDB({
      level: 'error', 
      db: databaseUri as string,
      options: { useUnifiedTopology: true },
      collection: 'log_errors', 
      tryReconnect: true,
      format: winston.format.metadata()
    })
  ],
});

export default logger;
