const validateRequestBody = (schema) => {
  return async (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.json({
        success: false,
        message: "Invalid request",
        data: null,
      });
    }
    next();
  };
};

module.exports = { validateRequestBody };
