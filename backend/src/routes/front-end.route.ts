import express, { Router } from 'express';
import { Request, Response } from 'express';
import { reactAppBuildPath, reactAppIndexHtml, reactAppAdminIndexHtml} from '../config/system/paths.config';
import { checkAthorizedIp } from '../middlewares/security/authorize-ip.middleware';
import { isAuthenticated } from '../middlewares/security/is-authenticated.middleware';
import { isAdmin } from '../middlewares/security/is-admin.middleware';

const frontendRouter: Router = express.Router();

frontendRouter.use(express.static(reactAppBuildPath));

frontendRouter.get("/admin", checkAthorizedIp, isAuthenticated, isAdmin, (req: Request, res: Response) => {
    res.sendFile(reactAppAdminIndexHtml);
});

frontendRouter.get('*', (req: Request, res: Response) => {
    res.sendFile(reactAppIndexHtml);
});

export default frontendRouter;