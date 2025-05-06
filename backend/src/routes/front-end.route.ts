import express, { Router } from 'express';
import { Request, Response } from 'express';
import { reactAppBuildPath, reactAppIndexHtml} from '../config/system/paths.config';

const frontendRouter: Router = express.Router();
frontendRouter.use(express.static(reactAppBuildPath))

frontendRouter.get('*', (req: Request, res: Response) => {
    res.sendFile(reactAppIndexHtml);
});

export default frontendRouter;