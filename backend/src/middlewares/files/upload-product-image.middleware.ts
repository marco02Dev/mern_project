import multer from "multer";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";

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


export const uploadProductImages = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "product-image", maxCount: 1 },
  { name: "hero-image",    maxCount: 1 },
]);


export const imagesConversionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filesObj = req.files as Record<string, Express.Multer.File[]> | undefined;
  if (!filesObj) return next();

  const files = Object.values(filesObj).flat();
  if (files.length === 0) return next();

  Promise.all(
    files.map(async (file) => {
      const filePath = file.path;
      const convertedPath = path.join(
        path.dirname(filePath),
        `${path.parse(file.originalname).name}.webp`
      );

      await sharp(filePath).webp({ quality: 80 }).toFile(convertedPath);
      await fs.promises.unlink(filePath); 
      file.path = convertedPath;
    })
  )
    .then(() => {
      console.log("[UPLOAD] Tutte le immagini convertite");
      next();
    })
    .catch((err) => {
      console.error("[UPLOAD] Errore durante la conversione", err);
      sendErrorMessage({ response: res, statusCode: 500 });
    });
};
