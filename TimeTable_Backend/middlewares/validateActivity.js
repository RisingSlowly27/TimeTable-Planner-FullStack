const validateActivity = (req, res, next) => {
  const { name, startTime, endTime } = req.body;

  // Required fields validation
  if (!name || !startTime || !endTime) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  // Time validation
  if (startTime >= endTime) {
    return res.status(400).json({
      error: "startTime must be less than endTime"
    });
  }

  // If validation passes, continue to next step
  next();
};

export default validateActivity;