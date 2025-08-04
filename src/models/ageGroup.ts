import mongoose from 'mongoose';

export interface IAgeGroup  extends mongoose.Document {
  name: string;
}

const ageGroupSchema = new mongoose.Schema({

  name: { type: String, required: true }

}, { timestamps: true });




const AgeGroupModel = mongoose.model<IAgeGroup> ("AgeGroup" , ageGroupSchema);

export default AgeGroupModel;