import type { Request, Response } from 'express';
import articleModels from '../models/article.js';
import mongoose from 'mongoose';
// import AgeGroupModel from '../models/ageGroup.js';

export const getArticleFilter = async (req: Request, res: Response) => {
    try {
    const { ageGroupId , type   } = req.query;

    console.log('Query Parameters:', { ageGroupId, type });
    const filter: Record<string, any> = {};

    if (ageGroupId) filter.age_group = ageGroupId;
    if (type) filter.type = type;



   const cntent = await articleModels.find(filter).populate('age_group');

   return res.status(200).json(cntent);
   
    }
    catch (error) {
        console.error('Error fetching content filter:', error);
        return res.status(500).json({ error: 'خطأ في جلب المحتوى' });
    }
};


export const searchForArticle = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const { ageGroupId, type } = req.body;

    if (!type || typeof type !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing type' });
    }
    if (!ageGroupId) {
      return res.status(400).json({ error: 'Invalid or missing ageGroupId' });
    }

    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing keyword' });
    }

    const pipeline: any[] = [];

    // 1. Atlas full-text search
    pipeline.push({
      $search: {
        index: "default",
        text: {
          query: keyword,
          path: ["title", "topic"]
        }
      }
    });

    // 2. Apply filters (type, age_group)
    pipeline.push({
      $match: {
        type: type,
        age_group: new mongoose.Types.ObjectId(ageGroupId)
      }
    });

    // 3. Lookup to populate age_group info
    pipeline.push({
      $lookup: {
        from: "agegroups",
        localField: "age_group",
        foreignField: "_id",
        as: "age_group"
      }
    });

    // 4. Unwind age_group array
    pipeline.push({
      $unwind: {
        path: "$age_group",
        preserveNullAndEmptyArrays: true
      }
    });

    // 5. Limit results
    pipeline.push({
      $limit: 20
    });

    const results = await articleModels.aggregate(pipeline);

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return res.status(500).json({ error: 'خطأ في البحث عن المحتوى' });
  }
};
