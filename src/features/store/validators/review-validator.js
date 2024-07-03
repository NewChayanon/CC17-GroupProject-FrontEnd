import Joi from "joi"


const reviewSchema = Joi.object({
    rating:Joi.string().required().messages({"string.empty":"Please select rating"}),
    topic:Joi.string().required().messages({"string.empty":"Please input topic"}),
    details:Joi.string().required().messages({"string.empty":"Please input details"}),
})

const validateReview = (input) => {
    const {error} = reviewSchema.validate(input,{abortEarly:false});
    if(error){
        const result = error.details.reduce((acc,el)=>{
            console.log(el)
            acc[el.path[0]] = el.message;
            return acc
        },{})
        return result
    }
}
export default validateReview