import ContactUsModel from "../../models/contactUs.js";
import type { Request, Response } from "express";

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