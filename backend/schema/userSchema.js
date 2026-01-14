const z = require("zod");

const signupSchema = z.object({
  username: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  password: z.string().min(7),
});

const signinSchema = signupSchema.pick({
  username: true,
  password: true,
});

const editProfileSchema = signupSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be updated",
  });

module.exports = {
  signupSchema,
  signinSchema,
  editProfileSchema,
};
