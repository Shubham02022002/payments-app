const z = require("zod");

const signupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),

});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const profileUpdateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(6).optional(),
})

const transferFundsSchema = z.object({
    to: z.string(),
    amount: z.number()
}).strict();

module.exports = {
    signupSchema,
    loginSchema,
    profileUpdateSchema,
    transferFundsSchema
}