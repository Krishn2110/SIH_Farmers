import Prediction from "../models/Prediction.js";
import User from "../models/UserModel.js";

router.post("/predict", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming verifyToken adds req.user
    const {
      soilType, previousCrop, soilPh, temperature,
      rainfall, humidity, phosphorus, nitrogen,
      phosphorous, previousYield
    } = req.body;

    // Call your ML model / Flask API here
    const predictedResult = await getPredictionFromFlask(req.body);

    // Save prediction in DB
    const prediction = await Prediction.create({
      userId,
      soilType,
      previousCrop,
      soilPh,
      temperature,
      rainfall,
      humidity,
      phosphorus,
      nitrogen,
      phosphorous,
      previousYield,
      result: predictedResult
    });

    res.json({ prediction: predictedResult, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Prediction failed" });
  }
});


router.get("/history", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await Prediction.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
});
