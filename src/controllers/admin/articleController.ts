import type { Request, Response } from 'express';
import ArticleModel from '../../models/article.js';
import uploadToImgBB from '../../utils/uploadToImgBB.js'; // Assuming you have a utility function to handle image uploads
// اضافة خبر جديد او مقال 

const AddArticle = async (req: Request, res: Response) => {
    try {
        const { title, type, topic, age_group } = req.body;

        if (!title || !topic || !age_group || !type) {
            return res.status(400).json({ error: 'مطلوب عنوان وموضوع وفئة عمرية' });
        }
        if (!req.file) {
            return res.status(400).json({ msg: 'الصورة مطلوبة' });
        }
        const { url: imageUrl, deleteUrl } = await uploadToImgBB(req.file.buffer);

        if (!imageUrl) {
            return res.status(500).json({ error: 'فشل تحميل الصورة' });
        }
        console.log(imageUrl)

        const newArticle = await ArticleModel.create({
            title,
            type,
            image: imageUrl,
            imageDeleteUrl: deleteUrl,
            topic,
            age_group
        });
 
        console.log(newArticle)
        return res.status(201).json(newArticle);

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: 'خطأ في إضافة المقال', details: errorMessage });
    }
}

export { AddArticle };


