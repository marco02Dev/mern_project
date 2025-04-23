import multer from "multer";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { sendErrorMessage } from "../utils/send-error-massage.util";

const storage = multer.diskStorage({
  destination(req: Request, file, cb) {
    try {
      const { id, category } = req.params;

      if (!id) {
        return cb(new Error("ID missing"), "");
      }
      if (!category) {
        return cb(new Error("Category missing"), "");
      }

      const dir = path.join(
        __dirname,
        "../../public/images/products",
        category,
        id
      );

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      } else {
        console.log("[UPLOAD] Folder already exists");
      }

      cb(null, dir);
    } catch (err) {
      console.error("[UPLOAD] Exception in destination()", err);
      cb(err as Error, "");
    }
  },

  filename(req, file, cb) {
    try {
      const { id, category } = req.params;
      const fileName = `${path.parse(file.originalname).name}-originale${path.extname(file.originalname)}`;
      cb(null, fileName);
    } catch (err) {
      console.error("[UPLOAD] Exception in filename()", err);
      cb(err as Error, "");
    }
  },
});


export const uploadProductImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("product-image");


export const imageConversionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.file) {
    return next();
  }

  const file = req.file;                    
  const filePath = file.path;
  const convertedPath = path.join(
    path.dirname(filePath),
    `${path.parse(file.originalname).name}.webp`
  );

  console.log("[UPLOAD] Converting file:", filePath);

  sharp(filePath)
    .webp({ quality: 80 })
    .toFile(convertedPath, (err, info) => {
      if (err) {
        console.error("[UPLOAD] Error processing image:", err);
        return sendErrorMessage({ response: res, statusCode: 500 });
      }

      console.log("[UPLOAD] Image converted:", info);

      fs.unlink(filePath, unlinkErr => {
        if (unlinkErr) {
          console.error("[UPLOAD] Error deleting original file:", unlinkErr);
        } else {
          console.log("[UPLOAD] Original file deleted");
        }
      });

      file.path = convertedPath;

      next();
    });
};