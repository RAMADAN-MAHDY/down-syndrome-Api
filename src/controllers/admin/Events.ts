import EventModel from '../../models/event.js'
import {Request , Response } from 'express'

export const AddEvents =async (req :Request , res :Response ) =>{
    try{
        const { title, type, date, time, location } = req.body;
        
        if(!title || !type || !date || !time || !location) {
            return res.status(400).json({ message: 'All fields are required' });
          }
        const newEvent = new EventModel({
            title,
            type,
            date,
            time,
            location
        });
        
        newEvent.save()
        
        return res.status(201).json({ message: 'Event added successfully', event: newEvent });
    }catch(error){
        console.error('Error adding event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }



}