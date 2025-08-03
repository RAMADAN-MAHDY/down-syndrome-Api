import type { Request, Response, NextFunction } from 'express';

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  // تحقق من التوكن (للتوسعة لاحقاً)
  const token = req.headers['authorization'];
  if (token === 'admin-token') {
    next();
  } else {
    res.status(401).json({ error: 'غير مصرح' });
  }
}
