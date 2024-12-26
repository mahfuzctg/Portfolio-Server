import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const authValidations = {
  loginValidationSchema,
};
