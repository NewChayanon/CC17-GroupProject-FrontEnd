import useStore from "../../zustand/store";
import Button from "../../components/Button";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import addImageButton from "../../images/add-image-button.png";
import { useState } from "react";
import userApi from "../../apis/user";
import { useRef } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validateSettings from "./validators/settings-validator";
import DatePicker from "react-datepicker";

function RadioButtons({ handleChange }) {
  return (
    <>
      <div className="p-1 rounded-lg">
        <div className="flex justify-around items-center text-xs">
          <label>
            <input
              type="radio"
              name="gender"
              value="MALE"
              className="radio-green"
              onChange={handleChange}
            />
            &nbsp; Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              className="radio-green"
              onChange={handleChange}
            />
            &nbsp; Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="OTHERS"
              className="radio-green"
              onChange={handleChange}
            />
            &nbsp; Others
          </label>
        </div>
      </div>
    </>
  );
}

export default function UserSettings() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const initialInput = {
    ...user,
    dateOfBirth: user.dateOfBirth?.split("T")[0],
  };

  const [input, setInput] = useState(initialInput);
  const [inputSubmit, setInputSubmit] = useState({});
  // const [inputError, setInputError] = useState(initialInputError);
  const [image, setImage] = useState(initialInput.profileImage);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);

  const fileEl = useRef();

  const submitChange = async () => {
    try {
      console.log(input);

      const formData = new FormData();
      for (const key in inputSubmit) {
        if (inputSubmit[key]) {
          if (key === "dateOfBirth") {
            const modifyDate = `${inputSubmit[key]}T00:00:00.000Z`;
            formData.append(key, modifyDate);
          } else {
            formData.append(key, inputSubmit[key]);
          }
        }
      }

      setIsLoading(true);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      // const logFormData = (formData) => {
      //   for (let pair of formData.entries()) {
      //     console.log(`${pair[0]}: ${pair[1]}`);
      //   }
      // };
      // logFormData(formData);

      const response = await userApi.changeInfoSettings(formData);
      console.log(response);
      // setInputError({ ...initialInput });

      setInput((prevState) => ({
        ...prevState,
        displayName: response.data.displayName,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputSubmit({ ...inputSubmit, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="p-5 pt-10 flex flex-col items-center">
        <div className="pb-5 relative">
          <input
            className="hidden"
            type="file"
            ref={fileEl}
            onChange={handleImageChange}
          />
          {image && (
            <div
              className="flex flex-col justify-center items-center rounded-full"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "125px",
                height: "125px",
              }}
            ></div>
          )}
          {!image && (
            <img
              src={durianProfileLogo}
              alt="Durian profile mock picture"
              className="w-30 h-30"
            />
          )}
        </div>
        <div
          className="absolute pt-24 pl-28"
          onClick={() => fileEl.current.click()}
        >
          <img
            src={addImageButton}
            alt="Add image button"
            className="w-7 h-7 cursor-pointer"
          />
        </div>
        <div className="flex">
          <div className=" text-primary font-semibold pt-5 px-2 text-sm w-36 flex flex-col gap-4">
            <div>Display Name</div>
            <div>Real Name</div>
            <div>Store Name</div>
            <div>Email</div>
            <div>Date of Birth</div>
            <div>Mobile</div>
            <div>Gender</div>
            {changePassword ? (
              <div className="flex flex-col gap-3">
                <div>Password</div> <div>Confirm Password</div>
              </div>
            ) : (
              <div>Password</div>
            )}
          </div>
          <div className="p-4 text-sm flex flex-col gap-2">
            <div className="flex items-center">
              <input
                placeholder="Display Name"
                className="p-1 pl-2 w-36 rounded-md"
                name="displayName"
                value={input.displayName}
                onChange={handleChange}
                disabled={!editName}
              />
              <div
                className="text-primary text-xs underline font-semibold pl-3 cursor-pointer"
                onClick={() => {
                  setEditName(!editName);
                  setAllowSubmit(editName); // Enable submit only if edit is being saved
                }}
              >
                {editName ? "Save" : "Edit"}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div>
                <input
                  placeholder="First name"
                  className=" p-1 pl-2 w-20 rounded-md"
                  value={input.firstName}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div>
                <input
                  placeholder="Last name"
                  className="p-1 pl-2 w-32 rounded-md"
                  value={input.lastName}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="flex p-1 pl-2 text-xs gap-1 ">
              No store yet!
              <div
                className="underline hover:text-darkgreen cursor-pointer text-lightgreen "
                onClick={() => navigate("/user/activate-store-from-mobile")}
              >
                Activate
              </div>
              the store?
            </div>
            <div>
              <input
                placeholder="myname12@mail.com"
                className="p-1 pl-2 w-48 rounded-md bg-transparent border-none outline-none disabled"
                value={input.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              {/* <DatePicker
                selected={selectDOB}
                onChange={(date) => setSelectDOB(date)}
                dateFormat="MM/dd/yyyy"
                showYearDropdown
              /> */}
              <input
                type="date"
                className="p-1 pl-2 w-48 rounded-md text-gray-400"
                name="dateOfBirth"
                value={input.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <div>
                {editMobile ? (
                  <input
                    placeholder="10 digits without dash"
                    className="p-1 pl-2 w-36 rounded-md"
                    name="mobile"
                    value={input.mobile}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    placeholder="10 digits without dash"
                    className="p-1 pl-2 w-36 rounded-md"
                    name="mobile"
                    value={input.mobile}
                    onChange={handleChange}
                    disabled
                  />
                )}
              </div>
              {editMobile ? (
                <div
                  className="text-primary text-xs underline font-semibold pl-3 cursor-pointer"
                  onClick={() => {
                    setEditMobile(false);
                    setAllowSubmit(true);
                  }}
                >
                  Save
                </div>
              ) : (
                <div
                  className="text-primary text-xs underline font-semibold pl-3 cursor-pointer"
                  onClick={() => {
                    setEditMobile(true);
                    setAllowSubmit(false);
                  }}
                >
                  Edit
                </div>
              )}
            </div>
            <div>
              {initialInput.gender ? (
                <div>testing</div>
              ) : (
                <div>
                  <RadioButtons
                    name="gender"
                    onChange={handleChange}
                    value={input.gender}
                    error=""
                  />
                </div>
              )}
            </div>

            <div className="flex items-end">
              {changePassword ? (
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="password"
                    placeholder="●●●●●●●●●"
                    className="p-1 pl-2 w-36 rounded-md"
                    name="password"
                    onChange={handleChange}
                    value={input.password}
                  />

                  <input
                    type="password"
                    placeholder="●●●●●●●●●"
                    className="p-1 pl-2 w-36 rounded-md"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={input.confirmPassword}
                  />
                </div>
              ) : (
                <input
                  type="password"
                  placeholder="●●●●●●●●●"
                  className="p-1 pl-2 w-36 rounded-md"
                  name="password"
                  onChange={handleChange}
                  value={input.password}
                  disabled
                />
              )}

              {changePassword ? (
                <div
                  className="text-primary text-xs underline font-semibold pl-3 cursor-pointer"
                  onClick={() => {
                    setChangePassword(false);
                    setAllowSubmit(true);
                  }}
                >
                  Save
                </div>
              ) : (
                <div
                  className="text-primary text-xs underline font-semibold pl-3 cursor-pointer"
                  onClick={() => {
                    setChangePassword(true);
                    setAllowSubmit(false);
                  }}
                >
                  Change
                </div>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      {allowSubmit ? (
        <div className="col-span-2 text-center pb-10">
          <Button onClick={submitChange}>Confirm Change</Button>
        </div>
      ) : (
        <div className="col-span-2 text-center pb-10">
          <button
            className="bg-gray-300 text-gray-100 py-2 px-5 rounded-3xl "
            disabled
          >
            Confirm Change
          </button>
        </div>
      )}
    </>
  );
}
