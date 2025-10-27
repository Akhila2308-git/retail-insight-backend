import express from "express";
import { getInsights } from "../controllers/insightsController.js";

const router = express.Router();

// ✅ GET request for Insights
router.get("/", getInsights);

export default router;

