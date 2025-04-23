import multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

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
    console.log("[UPLOAD] Saving file:", file.originalname);
    cb(null, file.originalname);
  },
});

export const uploadProductImage = multer({ storage }).single("product-image");