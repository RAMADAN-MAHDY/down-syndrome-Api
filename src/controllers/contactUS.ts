import ContactUsModel from "../models/contactUs.js";
import type { Request, Response } from "express";


export const createContactUs = async (req: Request, res: Response) => {
    try {
        const { title, phone, date } = req.body;

        // التحقق من وجود الحقول المطلوبة
        if (!title || !phone || !date) {
            return res.status(400).json({ error: "جميع الحقول مطلوبة" });
        }

        // إنشاء سجل جديد في قاعدة البيانات
        const newContact = new ContactUsModel({ title, phone, date });
        await newContact.save();

        return res.status(201).json(newContact);
    } catch (error) {
        console.error('Error creating contact:', error);
        return res.status(500).json({ error: 'خطأ في إنشاء الاتصال' });
    }
};
