import { useState } from "react";
import storeApi from "../../apis/store";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputTextarea from "../../components/InputTextarea";
import validateReview from "./validators/review-validator";
const initialInput = {
  rate: "FIVE",
  topic: "",
  comment: "",
};
const initialInputError = {
  rate: "",
  topic: "",
  comment: "",
};

export default function ReviewForm({ storeId, onClose }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      console.log("Handle submit form");
      const error = validateReview(input);
      if (error) {
        setInputError(error);
        return;
      }
      // ถ้า validate ผ่าน >> เรียก API กับ BACKEND เพื่อ submit form เข้าไป
      const result = await storeApi.reviewStore(storeId, input);
      // console.log("result from submitting review via API", result.data.msg);
      onClose();
      // Refresh หน้าอีกรอบ
      location.reload();
    } catch (err) {
      // ถ้า error มาจาก backend (400)
      // setInputError(err);
      alert(err.msg);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div>Let's rate this store</div>
      <form className="flex flex-col items-center gap-4">
        <div className="rating rating-lg">
          <input
            type="radio"
            name="rate"
            value="ONE"
            onChange={handleChangeInput}
            className="mask mask-star-2 bg-secondary"
          />
          <input
            type="radio"
            name="rate"
            value="TWO"
            onChange={handleChangeInput}
            className="mask mask-star-2 bg-secondary"
          />
          <input
            type="radio"
            name="rate"
            value="THREE"
            onChange={handleChangeInput}
            className="mask mask-star-2 bg-secondary defaultChecked "
          />
          <input
            type="radio"
            name="rate"
            value="FOUR"
            onChange={handleChangeInput}
            className="mask mask-star-2 bg-secondary"
          />
          <input
            type="radio"
            name="rate"
            value="FIVE"
            onChange={handleChangeInput}
            className="mask mask-star-2 bg-secondary"
          />
        </div>
        <div>Let us know more on what you think</div>
        <Input
          placeholder="Subject"
          height="10"
          name="topic"
          onChange={handleChangeInput}
          value={input.topic}
          error={inputError.topic}
        />
        {/* <Input
          placeholder="Comments"
          height="10"
          name="comment"
          onChange={handleChangeInput}
          value={input.comment}
          error={inputError.comment}
        /> */}
        <InputTextarea
          placeholder="Comments"
          name="comment"
          rows="5"
          cols="30"
          value={input.comment}
          error={inputError.comment}
          onChange={handleChangeInput}
        />
        <Button onClick={handleSubmitForm}>Submit Review</Button>
      </form>
    </div>
  );
}
