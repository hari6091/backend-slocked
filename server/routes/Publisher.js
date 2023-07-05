import express from "express";

import { publishMQTTMessage, getPublisherPage } from "../controllers/Publish.js";

const router = express.Router();

// Publisher Home Route.
router.get("/", getPublisherPage);

router.post("/", publishMQTTMessage);

export default router;
