import type { Request, Response } from 'express';

export const getArticles = (req: Request, res: Response) => {
  // جلب المقالات والأخبار مع دعم التصفية
  res.json([
    { id: 1, title: 'مقال صحي', topic: 'الصحة', age_group: 1 },
    { id: 2, title: 'خبر تعليمي', topic: 'التعليم', age_group: 2 }
  ]);
};

export const searchArticles = (req: Request, res: Response) => {
  // البحث عن المقالات بالكلمات المفتاحية
  const { keyword } = req.query;
  res.json([{ id: 1, title: `بحث: ${keyword}` }]);
};

export const getArticleTopics = (req: Request, res: Response) => {
  // جلب خيارات التصفية (المواضيع والفئات العمرية)
  res.json({
    topics: ['الصحة', 'التعليم', 'الأنشطة'],
    ageGroups: ['0-3 سنوات', '4-12 سنة', '13-18 سنة', '18+ سنة']
  });
};
