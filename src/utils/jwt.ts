import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();
const secretKey = process.env.JWT_SECRET as string; 

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, secretKey);
};

export const verifyToken = (token: string): any => {

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}