import mongoose, { Schema, Document } from "mongoose";
import { text } from "stream/consumers";

// أنواع المحتوى
const contentTypes = ["تعليم", "صحة", "رياضه"] as const;
type ContentType = typeof contentTypes[number];

const slugType = ["vid" , "text"] as const;
type SlugType = typeof slugType[number];
// واجهة المحتوى
export interface Content extends Document {
    title: string;
    type: ContentType;
    sluge: SlugType;
    description: string;
    articleText?: string;
    url?: string;
    ageGroup: mongoose.Types.ObjectId; // رابط لفئة عمرية
    problemTag: string;
}

// سكيمة Mongoose
const contentSchema = new Schema<Content>(
    {
        title: { type: String, required: true },
        type: { type: String, enum: contentTypes, required: true },
        description: { type: String, required: true },
        sluge: { type: String , enum: slugType , required : true }, // Fixed field name to match interface
        url: { type: String },
        articleText: { type: String },
        ageGroup: { type: mongoose.Schema.Types.ObjectId, ref: "AgeGroup", required: true },
        problemTag: { type: String , required: true }, // Assuming problemTag is a string
    },
    { timestamps: true }
);

const ContentModel = mongoose.model<Content>("Content", contentSchema);
export default ContentModel;
 