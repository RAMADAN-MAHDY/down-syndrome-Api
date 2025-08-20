import EventModel from '../../models/event.js'
import { Request, Response } from 'express'

export const AddEvents = async (req: Request, res: Response) => {
    try {
        const { title, type, date, time, location } = req.body;

        if (!title || !type || !date || !time || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newEvent = new EventModel({
            title,
            type,
            date,
            time,
            location
        });

        newEvent.save()

        return res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}



export const EditEvents = async (req: Request, res: Response) => {
    try {

        const data = req.body;
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "رجاك ارسال ال ID الخاص بالمحتوي " })
        };
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "رجاك ارسال البانات المطلوب تعديلها" })
        };

        const resultData = await EventModel.findByIdAndUpdate(id, data, { new: true });

        if (!resultData) {
            return res.status(404).json({ message: "خطا غير متوقع اثناء التعديل" })
        };

        return res.status(200).json({
            message: "تم تحديث المحتوي بنجاح",
            Event: resultData
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : err;
        return res.status(500).json({ error: "خطا في تعديل الحدث", details: errorMessage })
    }
}


export const DeleteEvent = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "رجاك ارسال ال ID الخاص بالمحتوي " })
        }

        const result = await EventModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "الفاعليه غير موجوده أو تم حذفه بالفعل" });
        }

        return res.status(200).json({ message: "تم الحذف بجاح" });

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: "خطا في حذقف الفاعليت او الاحداث", details: errorMessage })
    }

}