import express from "express";
import {
  createGroup,
  getGroups
} from "../controllers/groupController.js";

import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();


// GET all groups
router.get("/", asyncHandler(getGroups));


// CREATE group
router.post("/", asyncHandler(createGroup));

export default router;