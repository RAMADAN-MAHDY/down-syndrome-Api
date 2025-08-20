import type { Request, Response } from 'express';
import ContentModel from '../models/content.js';
// import AgeGroupModel from '../models/ageGroup.js';

export const getContentFilter =async (req: Request, res: Response) => {
    try {
    const { ageGroupId, problemTag, type , sluge} = req.query;

    console.log('Query Parameters:', { ageGroupId, problemTag, type });
    const filter: Record<string, any> = {};

    if (ageGroupId) filter.ageGroup = ageGroupId;
    if (problemTag) filter.problemTag = problemTag; // مش array
    if (type) filter.type = type;
    if (sluge) filter.sluge = sluge; // Assuming slug is a field in your ContentModel

   const cntent = await ContentModel.find(filter).populate('ageGroup');

   return res.status(200).json(cntent);
   
    }
    catch (error) {
        console.error('Error fetching content filter:', error);
        return res.status(500).json({ error: 'خطأ في جلب المحتوى' });
    }
};

