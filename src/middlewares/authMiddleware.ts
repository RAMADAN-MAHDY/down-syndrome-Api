import type { Request, Response, NextFunction } from 'express';
import {verifyToken} from '../utils/jwt.js'


interface AuthRequest extends Request {
  user?: { id: string };
}


export const adminAuth = (req :AuthRequest , res :Response , next :NextFunction ) => {
  const token = req.cookies.AccessToken; // أو من Authorization header
  if (!token) return res.status(401).json({ message: "No token provided" });

  const { valid, expired, decoded } = verifyToken(token);

  if (!valid) {
    if (expired) return res.status(401).json({ message: "Token expired" });
    return res.status(401).json({ message: "Invalid token" });
  }

  // نخزن معلومات المستخدم في req للـ handlers التالية
  req.user = decoded;
  next();
};