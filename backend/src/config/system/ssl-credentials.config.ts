import fs from "fs";
import path from "path";
import { isProduction, isRender } from "./env.config";
import logger from "../libraries/winston.config";

export type SSLCredentials = {
    key: string; 
    cert: string   
}

let sslCredentials: SSLCredentials | undefined = undefined;

if (!(isProduction && isRender)) {
  try {
    const privateKeyPath = path.resolve(process.cwd(), "../ssl-key.pem");
    const certificatePath = path.resolve(process.cwd(), "../ssl-cert.pem");

    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    const certificate = fs.readFileSync(certificatePath, "utf8");

    sslCredentials = { key: privateKey, cert: certificate };
  } catch (error) {
    logger.error("SSL certificates not found or failed to read:", error);
  }
}

export { sslCredentials };
