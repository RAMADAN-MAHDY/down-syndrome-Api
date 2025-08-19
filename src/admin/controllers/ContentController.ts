import type { Request, Response } from 'express';
import ContentModel from '../../models/content.js';


function convertToEmbedUrl(url: string): string {
    if (url.includes('youtu.be')) {
        const videoId = url.split('/').pop()?.split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // رجع الرابط الأصلي لو مش عارف يعالجه
    return url;
}


// إضافة محتوى جديد
export const addContent = async (req: Request, res: Response) => {

    try {
        const { title, type, description, articleText, url, ageGroup, problemTag, sluge } = req.body;

        console.log('Request Body:', problemTag);
        if (!title || !type || !description || !ageGroup || !problemTag) {
            return res.status(400).json({ error: 'مطلوب عنوان ونوع ووصف وفئة عمرية والمشكله' });
        }
        if (!articleText && !url) {
            return res.status(400).json({ error: 'مطلوب نص المقال أو رابط' });
        }
        if (sluge !== 'vid' && sluge !== 'text') {
            return res.status(400).json({ error: 'نوع المحتوى غير صالح لازم يكون vid or text' });
        }
        // إذا كان النوع هو فيديو، يجب أن يكون الرابط صالحًا
        if (sluge === 'vid' && !url) {
            return res.status(400).json({ error: 'مطلوب رابط الفيديو' });
        }
        const VidUrl = url ? convertToEmbedUrl(url) : undefined;


        const newContent = new ContentModel({
            title,
            sluge,
            type,
            description,
            articleText: sluge === 'text' ? articleText : undefined, // إذا كان النوع نص، نضيف النص
            url: sluge === 'vid' ? VidUrl : undefined, // إذا كان النوع فيديو، نضيف الرابط
            ageGroup,
            problemTag,
        });

        const savedContent = await newContent.save();
        return res.status(201).json(savedContent);


    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: 'خطأ في اضافة المحتوي', details: errorMessage });
    }


};


// Edit content 
export const EditContent = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "رجاك ارسال ال ID الخاص بالمحتوي " })
        }
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "رجاك ارسال البانات المطلوب تعديلها" })
        }

        const resultData = await ContentModel.findByIdAndUpdate(id, data, { new: true });

        if (!resultData) {
            return res.status(404).json({
                message: "حدث خطأ غير متوقع يرجي اعادة المحاوله "
            });
        }

        return res.status(200).json({
            message: "تم تحديث المحتوي بنجاح",
            content: resultData
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: 'خطأ في تعديل المحتوي', details: errorMessage });
    }
}


export const DeleteContent = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "رجاك ارسال ال ID الخاص بالمحتوي " })
        }

        const result = await ContentModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "المحتوى غير موجود أو تم حذفه بالفعل" });
        }
        
        return res.status(200).json({ message: "تم الحذف بجاح" });

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: "خطا في حذقف المحتوي", details: errorMessage })
    }

}