import AdminModel from '../../models/createAdmin.js';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { AES, enc } from 'crypto-ts';
import { generateToken, verifyToken , generateRefreshToken  , verifyRefreshToken} from '../../utils/jwt.js';
dotenv.config();

export const logInAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" })
        }

        const result = await AdminModel.findOne({ email });
        if (!result) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (!process.env.Crypto_SECRET) {
            throw new Error("Crypto_SECRET is not defined in environment variables");
        }

        const passDecrypto = result.pass;
        const bytes = AES.decrypt(passDecrypto.toString(), process.env.Crypto_SECRET as string);
        const plaintext = bytes.toString(enc.Utf8);

        if (password === plaintext) {
            // create Access Token

            const AccessToken = generateToken({id : result._id});


            const refreshToken = generateRefreshToken({id :result._id});

            res.cookie("AccessToken", AccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'none',
                maxAge: 15 * 60 * 1000,
            })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            return res.status(200).json({ message: "done" })
        } else {
            return res.status(401).json({ message: "Invalid password" });

        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal server error" })
    }

}

export const refreshToken = (req : Request , res : Response )=>{

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  const { valid, expired, decoded } = verifyRefreshToken(refreshToken);

  if (!valid) return res.status(401).json({ message: expired ? "Refresh token expired" : "Invalid refresh token" });

  // إنشاء Access Token جديد
  const newAccessToken = generateToken({ id: decoded.id });
  
  // (اختياري) إنشاء Refresh Token جديد للتجديد المستمر
  const newRefreshToken = generateRefreshToken({ id: decoded.id });

  // إرسال التوكنات للكوكيز
  res.cookie("AccessToken", newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'none', maxAge: 15 * 60 * 1000 });
  res.cookie("RefreshToken", newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000 });

 return res.json({ message: "Tokens renewed" });
}

export const dashboard = (req :Request , res : Response)=>{
try{
    return res.json({ message: `Welcome Admin` });

}catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" })
}
} 
