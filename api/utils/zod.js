const z = require("zod");

const UserRegisterSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

module.exports = { UserRegisterSchema };
