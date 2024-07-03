import { useRef, useState } from "react";
import storeApi from "../../apis/store";
import Button from "../../components/Button";
import Input from "../../components/Input";
import validateReview from "./validators/review-validator";
const initialInput = {
  subject: "",
  message: "",
  reportImage: "",
};
const initialInputError = {
  subject: "",
  message: "",
  reportImage: "",
};

export default function ReportForm({ storeId }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const fileEl = useRef(); // {current:undefined}
  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
  };

  const handleUploadFile = (e) => {
    if (e.target.files[0]) {
      console.log("upload event", e);
      setInput({ ...input, [e.target.name]: e.target.files[0] });
    }
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      // Prepare form data to submit
      for (let key in input) {
        formData.append(key, input[key]);
      }
      console.log("final formData", formData);
      // API to submit formdata
      const result = await storeApi.reportStore(storeId, formData);
      console.log("result from submitting report", result);

      // เขียน validate input ของ report
      // const error = validateReview(input);
      // if (error) {
      //   setInputError(error);
      //   return;
      // }
    } catch (err) {
      console.log("Error from posting report", err);
      // เอา error มาแสดงต่อ
    }

    // ถ้า validate ผ่าน >> เรียก API กับ BACKEND เพื่อ submit form เข้าไป
  };
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          ref={fileEl}
          className="hidden"
          name="reportImage"
          onChange={handleUploadFile}
        />
        <div>
          All the information must be true and verifiable. This report will be
          carefully inspected by our team. Please leave the information in
          details and upload the relevant image evidence. We will get back to
          you via email.{" "}
        </div>
        <Input
          placeholder="Subject"
          height="10"
          name="subject"
          onChange={handleChangeInput}
          value={input.subject}
          error={inputError.subject}
        />
        <Input
          placeholder=""
          height="10"
          name="message"
          onChange={handleChangeInput}
          value={input.message}
          error={inputError.message}
        />
        {/* Image Input Type*/}
        <Button onClick={() => fileEl.current.click()}>Upload Evidence</Button>
        {/* <button onClick={() => fileEl.current.click()}>upload evidence</button> */}
        <div className="flex justify-center">
          <img
            src={
              input.reportImage ? URL.createObjectURL(input.reportImage) : null
            }
          />
        </div>
        <Button onClick={handleSubmitForm}>Submit Review</Button>
      </div>
    </div>
  );
}
