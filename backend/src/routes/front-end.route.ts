import express, { Router } from 'express';
import { Request, Response } from 'express';
import { reactAppPublicAssets, reactAppIndexHtml, reactAppAdminDist,reactAppAdminIndexHtml, reactAppAccountDist, reactAppAccountIndexHtml } from '../config/system/paths.config';
import { checkAthorizedIp } from '../middlewares/security/authorize-ip.middleware';
import { isAuthenticated } from '../middlewares/security/is-authenticated.middleware';
import { isAdmin } from '../middlewares/security/is-admin.middleware';

const frontendRouter: Router = express.Router();

frontendRouter.use(
  //Public
  '/assets',
  express.static(reactAppPublicAssets, {
    index: false,
  })
);

frontendRouter.use(
  //Admin
  '/admin',
  checkAthorizedIp,
  isAuthenticated,
  isAdmin,
  express.static(reactAppAdminDist, {
    index: false,
  })
);

frontendRouter.get(
  //Admin
  '/admin',
  checkAthorizedIp,
  isAuthenticated,
  isAdmin,
  (req: Request, res: Response) => {
    res.sendFile(reactAppAdminIndexHtml);
  }
);

frontendRouter.use(
  //User
  '/account',
  isAuthenticated,
  express.static(reactAppAccountDist, {
    index: false,
  })
);

frontendRouter.get(
  //User
  '/account',
  isAuthenticated,
  (req: Request, res: Response) => {
    res.sendFile(reactAppAccountIndexHtml);
  }
);

frontendRouter.get(
  //Public
  '*', 
  (req: Request, res: Response) => {
  res.sendFile(reactAppIndexHtml);
});

export default frontendRouter;
