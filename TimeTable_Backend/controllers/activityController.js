import Activity from "../models/Activity.models.js";

export const createActivity = async (req, res) => {

  const { name, group, startTime, endTime, week } = req.body;

  const newActivity = new Activity({
    name,
    group,
    startTime,
    endTime,
    week
  });

  await newActivity.save();

  res.status(201).json(newActivity);
};

export const getActivity = async (req, res) => {

  const selectedWeek = req.query.week;

    let filter = {};

    if (selectedWeek) {
    filter.week = selectedWeek;
    }

    const activities = await Activity
    .find(filter)
    .sort({ startTime: 1 });
    res.json(activities);
};

export const deleteActivity = async (req, res) => {

  const delId = req.params.id;
    const deleted = await Activity.findByIdAndDelete(delId);

    if (!deleted) {
        return res.status(404).json({
            error: "Activity not found"
        });
    }
    res.json({message:"Deletion Success"});
};

export const deleteActivityW = async (req, res) => {
  const delId = req.params.id;
  const deleted = await Activity.deleteMany({ week: delId });;

  if (!deleted) {
      return res.status(404).json({
          error: "Activity not found"
      });
  }
  res.json({message:"Deletion Success"});
};

export const updateActivity = async (req, res) => {

  const upId = req.params.id;
    const updates = req.body;

    const existingActivity = await Activity.findById(upId);

    if (!existingActivity) {
      return res.status(404).json({
        error: "Activity not found"
      });
    }

    // Determine final values after update
    const finalStartTime =
      updates.startTime ?? existingActivity.startTime;

    const finalEndTime =
      updates.endTime ?? existingActivity.endTime;

    // Validate times
    if (finalStartTime >= finalEndTime) {
      return res.status(400).json({
        error: "startTime must be less than endTime"
      });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      upId,
      updates,
      { new: true }   // return updated document
    );

    res.json(updatedActivity);
};