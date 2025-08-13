import EventModel from "../models/event.js";

import { Request, Response } from 'express';

export const GetEvents = async (req: Request, res: Response) => {
    try {
        const {type} = req.query;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        
        
        if (page <= 0 || limit <= 0) {
            return res.status(400).json({ message: 'Page and limit must be positive numbers' });
        }
        const filter = type ? { type } : {};
        
        
        const total = await EventModel.countDocuments(filter);

        const events = await EventModel.find(filter).sort({ date: 1, time: 1 }).skip(skip).limit(limit);

        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }
        return res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            events
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 