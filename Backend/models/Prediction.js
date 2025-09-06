// models/Prediction.js
import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    soilType: { type: String, required: true },
    previousCrop: { type: String, required: true },
    soilPh: { type: Number, required: true },
    temperature: { type: Number, required: true },
    rainfall: { type: Number, required: true },
    humidity: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    nitrogen: { type: Number, required: true },
    phosphorous: { type: Number, required: true },
    previousYield: { type: Number, required: true },
    result: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Predictions" }
);

const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
