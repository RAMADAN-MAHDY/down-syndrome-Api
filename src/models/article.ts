import mongoose, { ObjectId } from "mongoose";

const contentTypes = ["تعليم", "صحة", "رياضه"] as const;
type ContentType = typeof contentTypes[number];

export interface Article extends mongoose.Document {
    id: ObjectId;
    type: ContentType;
    title: string;
    topic: string;
    image: string;
    imageDeleteUrl: string | null;
    age_group: ObjectId;
}

const ArticleScherma = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    topic: { type: String, required: true },
    image: { type: String, require: true },
    imageDeleteUrl: { type: String, default: null },
    age_group: { type: mongoose.Schema.Types.ObjectId, ref: "AgeGroup", required: true }
}, {
    timestamps: true
})

const ArticleModel = mongoose.model<Article>("Article", ArticleScherma);
export default ArticleModel;