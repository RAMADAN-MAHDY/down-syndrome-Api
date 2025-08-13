import mongoose, { Document } from "mongoose";

const eventTypes = ['تعليم', 'رياضه', 'صحة'] as const;

type eventType = typeof eventTypes[number];


interface Event extends Document {
    title: string;
    type: eventType;
    date: string;
    time: string;
    location: {
        type: "Point",
        coordinates: [number, number] // [longitude, latitude]  
    };
}

const EventSchema = new mongoose.Schema<Event>({
    title: { type: String, required: true },
    type: { type: String, enum: eventTypes, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },

    location: {
        type: {
            type: String, 
            enum: ["Point"], 
            required: true
        }
        ,
        coordinates: { 
            type: [Number],
            required: true
         }
    }

}, { timestamps: true })


EventSchema.index({ location: "2dsphere" ,title : "text", type : "text" });

const EventModel = mongoose.model<Event>("Event", EventSchema );

export default EventModel;