import path from "path";

export const reactAppBuildPath: string = path.join(process.cwd(), '../frontend/dist')
export const reactAppIndexHtml: string = path.join(reactAppBuildPath, "index.html");
export const reactAppAdminIndexHtml: string = path.join(reactAppBuildPath, "admin_index.html");