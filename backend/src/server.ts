import express from 'express';
import cors from 'cors';
import { Express } from 'express';
import { port } from './config/env';
import { connectToDatabase } from './config/connect-to-database';
import productsRouter from './routes/products.route';
import usersRouter from './routes/users.route';
import path from "path";
import contactRouter from './routes/contact.route';
import passport from 'passport';
import { initializePassport } from './config/passport.config';

const app: Express = express();
initializePassport(passport);

app.use(cors())
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));


app.use("/api", productsRouter);
app.use("/api", usersRouter);
app.use("/api", contactRouter);

app.listen(port, '0.0.0.0', (): void => {
    connectToDatabase();
    console.log(`Server is listen on ${port}`);
});

export default app;