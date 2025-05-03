import { Request, Response, NextFunction } from "express";

export const memoryLogger = (req: Request, res: Response, next: NextFunction) => {
    const mem = process.memoryUsage();
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`  RSS: ${Math.round(mem.rss / 1024 / 1024)} MB`);
    console.log(`  Heap Total: ${Math.round(mem.heapTotal / 1024 / 1024)} MB`);
    console.log(`  Heap Used: ${Math.round(mem.heapUsed / 1024 / 1024)} MB`);
    console.log(`  External: ${Math.round(mem.external / 1024 / 1024)} MB`);
    next();
};
  
  