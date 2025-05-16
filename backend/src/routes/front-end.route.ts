import express, { Router } from 'express';
import { Request, Response } from 'express';
import { reactAppPublicAssets, reactAppIndexHtml, reactAppAdminDist,reactAppAdminIndexHtml, reactAppAccountDist, reactAppAccountIndexHtml } from '../config/system/paths.config';
import { checkAuthorizedIp } from '../middlewares/security/check-authorize-ip.middleware';
import { isAuthenticated } from '../middlewares/security/is-authenticated.middleware';
import { isAdmin } from '../middlewares/security/is-admin.middleware';

/**
 * Router to serve the React frontend application assets and HTML files.
 * 
 * This router handles:
 * - Public assets and main React app (available to all users)
 * - Admin panel (protected by IP authorization, authentication, and admin role middleware)
 * - User account area (protected by authentication middleware)
 * 
 * The router serves static files from the appropriate build directories and
 * sends the main index.html files for client-side routing support.
*/

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
  checkAuthorizedIp,
  isAuthenticated,
  isAdmin,
  express.static(reactAppAdminDist, {
    index: false,
  })
);

frontendRouter.get(
  //Admin
  '/admin',
  checkAuthorizedIp,
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
