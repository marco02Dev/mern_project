import mongoose, { Mongoose } from "mongoose";
import { databaseUri } from "../system/env.config";
import logger from "../libraries/winston.config";

export const connectToDatabase = async (): Promise<Mongoose | undefined> => {
    try {
        if (databaseUri && typeof databaseUri === 'string') {
            const connection: Mongoose = await mongoose.connect(databaseUri);
            const dbName = connection.connection.db?.databaseName;
            logger.info(`Database ${dbName} connection succesful`);
            return connection;
        } else {
            console.error('DATABASE_URI is not defined!');
            return Promise.reject('databaseUri not found');
        }
    } catch (error) {
        if(error instanceof Error) {
            logger.error('Error detected during DB connection: ', error.message);
            logger.error(error);  
            return Promise.reject('Conncection refused');
        }
    }
};
