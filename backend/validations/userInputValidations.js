export const validateInputs = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid inputs" });
  }
  req.userDetails = result.data;
  next();
};
