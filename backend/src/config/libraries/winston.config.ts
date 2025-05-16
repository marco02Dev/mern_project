import winston from 'winston';
import 'winston-mongodb';
import { databaseUri } from '../system/env.config';

const logger = winston.createLogger({
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
