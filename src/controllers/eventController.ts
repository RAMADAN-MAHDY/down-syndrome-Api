import type { Request, Response } from 'express';

export const getEvents = (req: Request, res: Response) => {
  // جلب الفعاليات القادمة
  res.json([
    { id: 1, name: 'فعالية توعوية', date: '2025-08-10', time: '10:00', location: 'الرياض' },
    { id: 2, name: 'ورشة عمل', date: '2025-08-15', time: '16:00', location: 'جدة' }
  ]);
};

export const searchEvents = (req: Request, res: Response) => {
  // البحث عن الفعاليات بالكلمات المفتاحية
  const { keyword } = req.query;
  res.json([{ id: 1, name: `بحث: ${keyword}` }]);
};

export const getNearbyEvents = (req: Request, res: Response) => {
  // جلب الفعاليات القريبة حسب الموقع الجغرافي
  const { latitude, longitude } = req.query;
  res.json([
    { id: 1, name: 'فعالية قريبة', location: { latitude, longitude } }
  ]);
};
