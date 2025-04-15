import mongoose, { Mongoose } from "mongoose";
import { databaseUri } from "./env.config";

export const connectToDatabase = async (): Promise<Mongoose | undefined> => {
    try {
        if (databaseUri && typeof databaseUri === 'string') {
            const connection: Mongoose = await mongoose.connect(databaseUri);
            const dbName = connection.connection.db?.databaseName;
            console.log(`Database ${dbName} connection succesful`);
            return connection;
        } else {
            console.error('DATABASE_URI is not defined!');
            return Promise.reject('databaseUri not found');
        }
    } catch (error) {
        if(error instanceof Error) {
            console.error('Error detected during DB connection: ', error.message);
            console.error(error);  
            return Promise.reject('Conncection refused');
        }
    }
};
