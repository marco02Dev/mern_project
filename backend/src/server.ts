import express from 'express';
import { Express } from 'express';
import { port } from './config/env';
import { connectToDatabase } from './utils/connect-to-database';

const app: Express = express();

app.listen(8000, (): void => {
    connectToDatabase();
    console.log(`Server is listen on ${port}`);
});

export default app;