import Joi from "joi";

const resetSchema = Joi.object({
  email: Joi.string().required().trim().messages({"string.empty": "email address is required."}),
})

const validateReset = (input) =>{
  const { error } = resetSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
}
export default validateReset;