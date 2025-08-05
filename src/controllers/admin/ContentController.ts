import type { Request, Response } from 'express';
import ContentModel from '../../models/content.js';


// إضافة محتوى جديد
export const addContent = async (req: Request, res: Response) => {
    // إضافة محتوى جديد
    const { title, type, description, articleText, url, ageGroup, problemTags , sluge} = req.body;

    if (!title || !type || !description || !ageGroup  ) {
        return res.status(400).json({ error: 'مطلوب عنوان ونوع ووصف وفئة عمرية' });
    }
        if (!articleText && !url) {
            return res.status(400).json({ error: 'مطلوب نص المقال أو رابط' });
        }
        if(sluge !== 'vid' && sluge !== 'text') {
            return res.status(400).json({ error: 'نوع المحتوى غير صالح لازم يكون vid or text'  });
        }
   
    const newContent = new ContentModel({
        title,  
        sluge,
        type,
        description,
        articleText,
        url,
        ageGroup,
        problemTags: problemTags 
    });
    newContent.save()
        .then(content => res.status(201).json(content))
        .catch(err => res.status(500).json({ error: 'خطأ في حفظ المحتوى', details: err.message }));

};



export const adminLogin = (req: Request, res: Response) => {
  // تسجيل دخول المسؤول
  res.json({ success: true, token: 'admin-token' });
};


export const updateContent = (req: Request, res: Response) => {
  // تحديث محتوى موجود
  res.json({ success: true });
};

export const deleteContent = (req: Request, res: Response) => {
  // حذف محتوى
  res.json({ success: true });
};


export const addEvent = (req: Request, res: Response) => {
  // إضافة فعالية جديدة
  res.json({ success: true, id: 1 });
};

export const updateEvent = (req: Request, res: Response) => {
  // تحديث فعالية موجودة
  res.json({ success: true });
};

export const deleteEvent = (req: Request, res: Response) => {
  // حذف فعالية
  res.json({ success: true });
};

export const getAllEvents = (req: Request, res: Response) => {
  // جلب جميع الفعاليات
  res.json([{ id: 1, name: 'فعالية إدارية' }]);
};
