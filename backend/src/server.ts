import express from 'express';
import cors from 'cors';
import { Express } from 'express';
import { port } from './config/env';
import { connectToDatabase } from './database/connect-to-database';
import productsRouter from './routes/products.routes';
import usersRouter from './routes/users.routes';

const app: Express = express();

app.use(cors())
app.use(express.json());

app.use("/api", productsRouter);
app.use("/api", usersRouter);

app.listen(port, '0.0.0.0', (): void => {
    connectToDatabase();
    console.log(`Server is listen on ${port}`);
});

export default app;