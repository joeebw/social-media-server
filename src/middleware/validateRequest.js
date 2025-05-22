const validateRequest = (schema) => (req, res, next) => {
  try {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    req.body = validationResult.data;

    next();
  } catch (err) {
    throw err;
  }
};

export default validateRequest;
