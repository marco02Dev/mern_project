import mongoose, { Mongoose } from "mongoose";
import { databaseUri } from "@config/system/env.config";
import logger from "@config/libraries/winston.config";

export const connectToDatabase = async (): Promise<Mongoose | undefined> => {
    try {
        if (databaseUri && typeof databaseUri === 'string') {
            const connection: Mongoose = await mongoose.connect(databaseUri);
            const dbName: string | undefined = connection.connection.db?.databaseName;
            logger.info(`Database ${dbName} connection succesful`);
            return connection;
        } else {
            logger.error('DATABASE_URI is not defined!');
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
