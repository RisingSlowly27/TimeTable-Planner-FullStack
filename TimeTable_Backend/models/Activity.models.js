import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: String,
  group: String,
  startTime: String,
  endTime: String,
  week: String
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;