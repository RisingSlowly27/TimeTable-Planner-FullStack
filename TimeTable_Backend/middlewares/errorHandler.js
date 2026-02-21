const errorHandler = (err, req, res, next) => {

  console.log("Error:", err);

  res.status(500).json({
    error: "Something went wrong"
  });
};

export default errorHandler;