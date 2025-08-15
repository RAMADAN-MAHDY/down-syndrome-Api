import AdminModel from '../../models/createAdmin.js';
import { Request , Response } from 'express';
import dotenv from 'dotenv' ;
import { AES } from 'crypto-ts';

dotenv.config();

export const CreateAdmin = async (req : Request , res : Response) =>{
    try{
const {email , pass} = req.body;
    if(!email || !pass){
       return res.status(401).json({message : "All fields are required"})
    }
const encrypted_Pass = AES.encrypt(pass , process.env.Crypto_SECRET as string).toString();

// const bytes  = AES.decrypt(encrypted_Pass.toString(), process.env.Crypto_SECRET as string);
// const plaintext = bytes.toString(enc.Utf8);
 
const result = await AdminModel.create({
        email,
        pass : encrypted_Pass
    })
    if(!result){
       return res.status(401).json({message : "we have some worng for create admin"});

    }
       return res.status(200).json({message : "done"})

    }catch(error){
        console.error(error);
       return res.status(500).json({message : "internal server error"})
    }   

}