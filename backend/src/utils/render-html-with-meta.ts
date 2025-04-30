import fs from "fs";
import { Response } from "express";
import { sendErrorMessage } from "./send-error-massage.util";
import { indexHtmlPath } from "../server";

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
    .replace("{{DESCRIPTION}}", description);

    res.send(renderedHtml);
  });
}