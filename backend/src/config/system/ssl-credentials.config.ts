import fs, { PathOrFileDescriptor } from "fs";
import path from "path";

const privateKeyPath: string = path.resolve(process.cwd(), '../ssl-key.pem');
const certificatePath: string = path.join(process.cwd(), '../ssl-cert.pem');

const privateKey: PathOrFileDescriptor = fs.readFileSync(privateKeyPath, 'utf8');
const certificate: PathOrFileDescriptor = fs.readFileSync(certificatePath, 'utf8');
export const sslCredentials: {
    key: string,
    cert: string
} = { key: privateKey, cert: certificate };