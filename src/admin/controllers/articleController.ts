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

const EditArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let data = req.body;
        let getimageUrl: any;
        let getdeleteUrl: any;

        data = Object.fromEntries(
            Object.entries(data).filter(([_,value])=> value !== undefined && value !== null)
        )

        if (req.file) {
            const uploadResult = await uploadToImgBB(req.file.buffer);
            getimageUrl = uploadResult.url;
            getdeleteUrl = uploadResult.deleteUrl;

            if (!getimageUrl) {
                return res.status(500).json({ error: 'فشل تحميل الصورة' });
            }
            // console.log(getimageUrl)
            // console.log(getdeleteUrl)

            data.image = getimageUrl;
            data.imageDeleteUrl = getdeleteUrl;
        };

        const result = await ArticleModel.findByIdAndUpdate(id, data, { new: true });

        // console.log(result)

        return res.status(200).json({
            message: "تم تحديث المقال بنجاح",
            article: result
        });

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: 'خطأ في إضافة المقال', details: errorMessage });
    }
}

const DeleteArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({message : "ال id مطلوب"})
        }
        const findArticle = await ArticleModel.findById(id);

          if (!findArticle) {
            return res.status(404).json({ message: "لم يتم العثور على المقال للحذف أو تم حذفه من قبل" });
        }

         await ArticleModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "تم حذف المقال بنجاح",
        });

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: 'خطأ في إضافة المقال', details: errorMessage });
    }
}


export { AddArticle, EditArticle , DeleteArticle};


