import { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import validateReview from './validators/review-validator'
const initialInput = {
  rating:"FIVE",
  topic:"",
  comment:""
}
const initialInputError = {
  rating:"",
  topic:"",
  comment:""
}

export default function ReviewForm() {
const [input,setInput] = useState(initialInput)
const [inputError,setInputError] = useState(initialInputError)

const handleChangeInput = (e) => {
  setInput({...input,[e.target.name]:e.target.value})
  setInputError({...inputError,[e.target.name]:""})
}
const handleSubmitForm = (e) => {
  e.preventDefault()
  console.log("Handle submit form")
  const error = validateReview(input)
  if(error){
    setInputError(error)
    return;
  }

  // ถ้า validate ผ่าน >> เรียก API กับ BACKEND เพื่อ submit form เข้าไป

}
  return (
    <div className="flex flex-col items-center gap-4">
    <div>Let's rate this store</div>
    <form className="flex flex-col items-center gap-4">
      <div className="rating rating-lg">
        <input type="radio" name="rating" value="ONE" onChange={handleChangeInput} className="mask mask-star-2 bg-secondary" />
        <input type="radio" name="rating" value="TWO" onChange={handleChangeInput} className="mask mask-star-2 bg-secondary" />
        <input type="radio" name="rating" value="THREE" onChange={handleChangeInput} className="mask mask-star-2 bg-secondary defaultChecked " />
        <input type="radio" name="rating" value="FOUR" onChange={handleChangeInput} className="mask mask-star-2 bg-secondary" />
        <input type="radio" name="rating" value="FIVE" onChange={handleChangeInput} className="mask mask-star-2 bg-secondary" />
      </div> 
      <div>Let us know more on what you think</div>
      <Input
                    placeholder="Overall"
                    height="10"
                    name="topic"
                    onChange={handleChangeInput}
                    value={input.topic}
                    error={inputError.topic}
                  />
      <Input
                    placeholder="comment"
                    height="10"
                    name="comment"
                    onChange={handleChangeInput}
                    value={input.comment}
                    error={inputError.comment}
                  />

          <Button onClick={handleSubmitForm}>Submit Review</Button>
    </form>
    </div>
  )
}
