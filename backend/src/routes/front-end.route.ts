import express, { Router } from 'express';
import path from "path";
import { renderHtmlWithMeta } from '../utils/render-html-with-meta';
import { multiPageAppMode, isProduction } from '../config/system/env.config';

const frontendRouter: Router = express.Router();

if (isProduction) {
  const reactAppBuildPath: string = path.join(__dirname, "../../../frontend/dist/");

  frontendRouter.use("/", express.static(reactAppBuildPath));

  if (multiPageAppMode) {
    frontendRouter.get(/^\/(?!api).*/, (req, res) => {
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

export default frontendRouter;