import express from "express";
import { createFeedback, getAllFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

// POST - submit feedback
router.post("/", createFeedback);

// GET - fetch all feedback (admin use)
router.get("/", getAllFeedback);

export default router;
