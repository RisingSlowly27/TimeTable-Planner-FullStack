import Group from "../models/group.models.js";


// CREATE GROUP
export const createGroup = async (req, res) => {

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Group name required"
    });
  }

  const newGroup = new Group({
    name
  });

  await newGroup.save();

  res.status(201).json(newGroup);
};


// GET ALL GROUPS
export const getGroups = async (req, res) => {

  const groups = await Group.find();

  res.json(groups);
};