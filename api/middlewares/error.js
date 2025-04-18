const appErrorHandler = (err, req, res, next) => {
  return res.json({
    success: false,
    message: "Internal server error",
    data: null,
  });
};

const notFoundHandler = (req, res) => {
  return res.json({
    success: false,
    message: "Route not found",
    data: null,
  });
};

module.exports = { appErrorHandler, notFoundHandler };
