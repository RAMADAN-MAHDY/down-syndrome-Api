import type { Request, Response } from 'express';

export const getAgeGroups = (req: Request, res: Response) => {
  // استرجاع الفئات العمرية المتاحة
  res.json([
    { id: 1, name: '0-3 سنوات' },
    { id: 2, name: '4-12 سنة' },
    { id: 3, name: '13-18 سنة' },
    { id: 4, name: '18+ سنة' }
  ]);
};

export const getGuidanceContent = (req: Request, res: Response) => {
  // استرجاع محتوى إرشادي لفئة عمرية محددة
  const { ageGroupId } = req.params;
  res.json({
    ageGroupId,
    articles: [
      { id: 1, title: 'مقال إرشادي', type: 'text', content: 'محتوى نصي' },
      { id: 2, title: 'فيديو توجيهي', type: 'video', url: 'https://youtube.com/example' }
    ]
  });
};
