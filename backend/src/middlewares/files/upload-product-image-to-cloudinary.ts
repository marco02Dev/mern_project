import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import streamifier from "streamifier";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { cloudinaryData } from "../config/system/env.config";

cloudinary.config(cloudinaryData);

const storage = multer.memoryStorage();

export const uploadProductImagesInRam = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "product-image", maxCount: 1 },
  { name: "hero-image", maxCount: 1 },
]);

const uploadToCloudinary = (buffer: Buffer, public_id: string, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder,
        public_id,
        format: "webp",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const uploadConvertedImagesToCloudinary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const filesObj = req.files as Record<string, Express.Multer.File[]> | undefined;
  
    if (!filesObj) {
      return next();
    }
  
    const files = Object.values(filesObj).flat();
    if (files.length === 0) {
      return next();
    }
  
    const { id, category } = req.params;
    if (!id || !category) {
      sendErrorMessage({ response: res, statusCode: 400 });
      return;
    }
  
    try {
  
      const uploadResults = await Promise.all(
        files.map(async (file) => {
  
          const webpBuffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer();
  
          const publicId = `${file.fieldname}-${id}`;
          const folder = `web-courses/products/${category}/${id}`;
  
          const result = await uploadToCloudinary(webpBuffer, publicId, folder);
  
          return {
            fieldname: file.fieldname,
            cloudinaryUrl: result.secure_url,
          };
        })
      );
  
      req.body.uploadedImages = uploadResults;
  
      next();
    } catch (err) {
      sendErrorMessage({ response: res, statusCode: 500 });
    }
  };
  