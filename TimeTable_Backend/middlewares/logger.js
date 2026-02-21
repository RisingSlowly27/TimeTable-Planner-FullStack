const logger = (req, res, next) => {

  console.log(`${req.method} ${req.originalUrl}`);

  next();   // VERY IMPORTANT
};

export default logger;