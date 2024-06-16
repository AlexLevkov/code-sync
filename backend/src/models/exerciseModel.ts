import mongoose, { Schema, Document, Model } from "mongoose";

const csDb = mongoose.createConnection(process.env.MONG_URI_CS!);

interface IExercise extends Document {
  title: string;
  content: string;
  solution?: string;
}

const exerciseSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Exercise: Model<IExercise> = csDb.model<IExercise>(
  "Exercise",
  exerciseSchema
);

export default Exercise;
