import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "First Name is required." }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Last Name is required." }),
  email: Joi.string().required().email({ tlds: false }).messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email.",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()-_=+?]{6,}$/)
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must be at least 6 characters and cannot contain certain special characters.",
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .strip()
    .messages({
      "string.empty": "Confirm password is required.",
      "any.only": "Password and confirm password did not match",
    }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegister;
