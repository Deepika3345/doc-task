errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode ? res.statusCode : 500;
  res.status(statuscode);
  res.send({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
