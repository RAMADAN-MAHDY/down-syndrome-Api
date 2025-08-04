import type { Request, Response } from 'express';
import AgeGroupModel from '../models/ageGroup.js';


// إنشاء فئة عمرية جديدة
export const createAgeGroup = async (req :Request , res : Response )=>{
   try {
    const { name } = req.body;
    if (!name) {    
        return res.status(400).json({ error: 'Name is required' });
    }   
    console.log('Creating Age Group:', name);
    // إنشاء فئة عمرية جديدة
    const existing  = await AgeGroupModel.find({name});
 console.log(existing)
    if(existing && existing.length > 0) {
        return res.status(400).json({ error: 'Age group already exists' });
    }
      // إنشاء فئة جديدة
    const newAgeGroup = new AgeGroupModel({ name });
    await newAgeGroup.save();

    res.status(201).json(newAgeGroup);
    } catch (error) {
        console.error('Error creating Age Group:', error);
    }
}

// استرجاع جميع الفئات العمرية
export const getAgeGroups = async (req: Request, res: Response) => {
    const getAgeGroups = await AgeGroupModel.find();
    if (!getAgeGroups || getAgeGroups.length === 0) {
        return res.status(404).json({ message: 'No age groups found' });
    }
    res.status(200).json(getAgeGroups);
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

