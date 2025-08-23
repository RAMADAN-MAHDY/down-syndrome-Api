import EventModel from '../../models/event.js';
import ContentModel from '../../models/content.js';
import ContactUsModel from "../../models/contactUs.js";
import ArticleModel from '../../models/article.js';
import { Request, Response } from 'express';

export const getAllCounts = async (req: Request, res: Response) => {
  try {
    // ✅ جلب عدد العناصر لكل مجموعة
    const eventsCount = await EventModel.countDocuments();
    const contentsCount = await ContentModel.countDocuments();
    const articlesCount = await ArticleModel.countDocuments();
    const contactsCount = await ContactUsModel.countDocuments();

    // ✅ إرجاع البيانات بصيغة JSON
    return res.json({
      events: eventsCount,
      contents: contentsCount,
      articles: articlesCount,
      contacts: contactsCount,
    });
    
  } catch (err) {
    console.error(err);
    const getError = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      error: 'خطأ في جلب الأعداد',
      details: getError,
    });
  }
};
