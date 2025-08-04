import type { Request, Response, NextFunction } from 'express';

export async function adminAuth(req: Request, res: Response, next: NextFunction) {
  // تحقق من التوكن (للتوسعة لاحقاً)
  const token = await req.headers['authorization'];
  console.log(token)
  if (token === 'Bearer admin-token') {
    next();
  } else {
    res.status(401).json({ error: 'غير مصرح' });
  }
}
