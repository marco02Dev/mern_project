import path from "path";

export const reactAppBuildPath: string = path.join(process.cwd(), '../frontend/dist');

export const reactAppPublicAssets: string = path.join(reactAppBuildPath, "assets");
export const reactAppIndexHtml: string = path.join(reactAppBuildPath, "client/index.html");

export const reactAppAdminDist: string = path.join(reactAppBuildPath, "admin");
export const reactAppAdminIndexHtml: string = path.join(reactAppAdminDist, "admin_index.html");

export const reactAppAccountDist: string = path.join(reactAppBuildPath, "account");
export const reactAppAccountIndexHtml: string = path.join(reactAppAccountDist, "account_index.html");