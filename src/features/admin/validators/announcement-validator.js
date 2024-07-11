import Joi from "joi";

const announceSchema = Joi.object({
  topic: Joi.string().required().trim().messages({"string.empty": "topic is required."}),
  message: Joi.string().required().trim().messages({"string.empty": "message is required."})
})

const validateAnnounce = (input) =>{
  const { error } = announceSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      console.log(el);
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
}
export default validateAnnounce;