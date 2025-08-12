import mongoose, { Schema, Document } from "mongoose";

export interface Contact extends Document {
    title: string;
    phone: string;
    date: string;

}

// سكيمة Mongoose
const contactUsSchema = new Schema<Contact>(
    {
        title: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: String , required : true }, // Fixed field name to match interface
    },
    { timestamps: true }
);

const ContactUsModel = mongoose.model<Contact>("Contact-us", contactUsSchema);
export default ContactUsModel;
 