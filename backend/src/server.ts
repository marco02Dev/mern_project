import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { sessionConfig } from './config/session.config';
import { Express } from 'express';
import { port, node_env, multiPageAppMode } from './config/env.config';
import { connectToDatabase } from './config/connect-to-database.config';
import productsRouter from './routes/products.route';
import usersRouter from './routes/users.route';
import path from "path";
import contactRouter from './routes/contact.route';
import passport from 'passport';
import { rejectRequestIfHoneyPotIsFilled } from './middlewares/reject-request-if-honey-pot-is-filled.middleware';
import { initializePassport } from './config/passport.config';
import { corsOptions } from './config/cors-options.config';
import cookieParser from 'cookie-parser';
import sessionRouter from './routes/session.route';
import https from 'https';
import fs from 'fs';
import { renderHtmlWithMeta } from './utils/render-html-with-meta';

const reactAppBuildPath = path.join(__dirname, "../../frontend/dist/");
export const indexHtmlPath = path.join(reactAppBuildPath, "index.html");

const privateKeyPath = path.join(__dirname, '..', 'ssl', 'dev-key.pem');
const certificatePath = path.join(__dirname, '..', 'ssl', 'dev-cert.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app: Express = express();

app.use(cookieParser());

app.use(session(sessionConfig));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(cors(corsOptions));
app.use(express.json());

app.use(rejectRequestIfHoneyPotIsFilled);

app.use('/images', express.static(path.join(__dirname, '../public/images')));



app.use("/api", sessionRouter);
app.use("/api", productsRouter);
app.use("/api", usersRouter);
app.use("/api", contactRouter);

if(node_env === "production") {

    app.use("/", express.static(reactAppBuildPath));

    if(multiPageAppMode) {
        app.get(/^\/(?!api).*/, (req, res) => {
            const path = req.url.split("/").filter(Boolean)[0] || "Home";
            const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
            const title = `${capitalize(path)} / Web Courses`;
        
            renderHtmlWithMeta(res, {
              title,
              description: "Discover top-quality online courses with Web Courses."
            });
          });
    }
}


https.createServer(credentials, app).listen(port, '0.0.0.0', () => {
    connectToDatabase();
    console.log(`Server is listen on ${port}`);
});

export default app;