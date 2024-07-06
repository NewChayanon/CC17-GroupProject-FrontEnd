import Joi from "joi";

const settingsSchema = Joi.object({
  displayName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()-_=+?]{6,15}$/)
    .messages({
      "string.empty": "Username is required.",
      "string.pattern.base": "Username must be 6-15 characters.",
    }),
  mobile: Joi.string()
    .allow("")
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "mobile number must be 10 digits.",
    }),
  password: Joi.string()
    .allow("")
    .pattern(/^[a-zA-Z0-9!@#$%^&*()-_=+?]{6,}$/)
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters and cannot contain certain special characters.",
    }),
  confirmPassword: Joi.string()

    .valid(Joi.ref("password"))
    .strip()
    .messages({
      "any.only": "Password and confirm password did not match",
    }),
}).options({ allowUnknown: true });

const validateSettings = (input) => {
  const { error } = settingsSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateSettings;
