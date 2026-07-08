const errorHandler = (err, req, res, next) => {
  console.error(err);
  
  // Avoid leaking sensitive error information
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const message = isDevelopment ? err.message : 'An error occurred processing your request';
  const status = err.status || 500;
  
  res.status(status).json({
    message: message,
    ...(isDevelopment && { error: err })
  });
};

module.exports = errorHandler;
