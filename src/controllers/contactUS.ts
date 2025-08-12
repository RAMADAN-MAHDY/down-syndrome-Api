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

export const getAllContacts = async (req: Request, res: Response) => {
    try {
        console.log("contacts")

        const contacts = await ContactUsModel.find();
        console.log(contacts)
        return res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return res.status(500).json({ error: 'خطأ في جلب الاتصالات' });
    }
};



export const getContactById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id)
        const contact = await ContactUsModel.findById(id);

        if (!contact) {
            return res.status(404).json({ error: "الاتصال غير موجود" });
        }

        return res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching contact:', error);
        return res.status(500).json({ error: 'خطأ في جلب الاتصال' });
    }
};