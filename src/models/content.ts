import mongoose, { Schema, Document } from "mongoose";

// أنواع المحتوى
const contentTypes = ["تعليم", "صحة", "نشاطات"] as const;
type ContentType = typeof contentTypes[number];

// واجهة المحتوى
export interface Content extends Document {
    title: string;
    type: ContentType;
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
        url: { type: String },
        articleText: { type: String },
        ageGroup: { type: mongoose.Schema.Types.ObjectId, ref: "AgeGroup", required: true },

        problemTag: {
            type: String,
        },
    },
    { timestamps: true }
);

const ContentModel = mongoose.model<Content>("Content", contentSchema);
export default ContentModel;
 