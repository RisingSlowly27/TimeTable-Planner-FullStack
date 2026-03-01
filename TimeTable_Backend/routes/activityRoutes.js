import express from "express";
import Activity from "../models/Activity.models.js";
import validateActivity from "../middlewares/validateActivity.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { createActivity, getActivity, deleteActivity, deleteActivityW, updateActivity } from "../controllers/activityController.js";

const router = express.Router();

router.post(
  "/",
  validateActivity,
  asyncHandler(createActivity)
);

router.get("/", asyncHandler(getActivity));

router.delete("/a/:id", asyncHandler(deleteActivity));
router.delete("/w/:id", asyncHandler(deleteActivityW));

router.put("/:id",asyncHandler(updateActivity));

export default router;