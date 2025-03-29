import express from 'express';
import { Express } from 'express';
import { port } from './config/env';
import { connectToDatabase } from './utils/connect-to-database';
import productsRouter from './routes/products.routes';
import usersRouter from './routes/users.routes';

const app: Express = express();
app.use(express.json());
app.use(productsRouter);
app.use(usersRouter);

app.listen(port, (): void => {
    connectToDatabase();
    console.log(`Server is listen on ${port}`);
});

export default app;