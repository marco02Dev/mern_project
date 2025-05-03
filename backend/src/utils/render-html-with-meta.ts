import fs from "fs";
import { Response } from "express";
import { sendErrorMessage } from "./send-error-massage.util";
import path from "path";
import { multiPageAppMode, isProduction } from "../config/system/env.config";

export const renderHtmlWithMeta = (
  res: Response,
  {
    title,
    description
  }: {
    title: string;
    description: string;
  }
): void => {
  if(multiPageAppMode && isProduction) {
    const reactAppBuildPath: string = path.join(__dirname, "../../../frontend/dist/");
    const indexHtmlPath: string = path.join(reactAppBuildPath, "index.html");

    fs.readFile(indexHtmlPath, "utf8", (err, htmlData) => {
      if (err) {
        console.error("Error reading index.html", err);
        sendErrorMessage({
          response: res,
          statusCode: 500
        });
        return;
      }
  
      const renderedHtml = htmlData
      .replace(/<title>.*<\/title>/, `<title>${title}</title>`)
      .replace(
        /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/,
        `<meta name="description" content="${description}" />`
      );
  
      res.send(renderedHtml);
    });
  } else {
    return;
  }
}