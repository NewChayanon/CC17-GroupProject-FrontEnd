import Joi from "joi";

const reportSchema = Joi.object({
  subject: Joi.string()
    .required()
    .messages({ "string.empty": "Please input subject" }),
  message: Joi.string()
    .required()
    .messages({ "string.empty": "Please input details" }),
  reportImage: Joi.object()
    .required()
    .custom((value, helpers) => {
      if (!value || !(value instanceof File)) {
        return helpers.error("object.base");
      }
      return value;
    })
    .messages({
      "object.base": "Please upload one evidence",
    }),
});

const validateReport = (input) => {
  const { error } = reportSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};
export default validateReport;
