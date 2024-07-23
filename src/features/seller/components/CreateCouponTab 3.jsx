/* eslint-disable react/prop-types */
import { useRef } from "react";
import UploadIcon from "../../../icons/upload-icon";
import useStore from "../../../zustand/store";
import CouponFullRightTab from "./CouponFullRightTab";

export default function CreateCouponTab({
  inputCoupon,
  setInputCoupon,
  input,
  inputError,
  setInputError,
}) {
  const storeDetail = useStore((state) => state.storeDetail);
  const { myStoreProfile } = storeDetail;
  const fileEl = useRef();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "code") {
      if (value.length < 6 || value.length > 10) {
        setInputError((prevState) => ({
          ...prevState,
          voucher: {
            ...prevState.voucher,
            [name]: "code must be 6-10 alphabets",
          },
        }));
      } else {
        setInputError((prevState) => ({
          ...prevState,
          voucher: {
            ...prevState.voucher,
            [name]: "",
          },
        }));
      }
    }

    setInputCoupon((prevState) => ({
      ...prevState,
      voucher: {
        ...prevState.voucher,
        [name]: value,
      },
    }));
  };

  const handleUploadFile = (e) => {
    if (e.target.files[0]) {
      setInputCoupon({ ...inputCoupon, [e.target.name]: e.target.files[0] });
    }
  };

  const getImageSrc = () => {
    if (typeof inputCoupon.voucherImage === "string") {
      return inputCoupon.voucherImage;
    } else if (inputCoupon.voucherImage instanceof File) {
      return URL.createObjectURL(inputCoupon.voucherImage);
    }
    return null;
  };

  return (
    <div className="m-4 px-4 py-6 bg-absolutewhite rounded-lg flex">
      <div className="w-7/12 flex flex-col gap-2">
        <div>
          <p className="text-primary font-bold text-2xl">Coupon Information</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-graydarktext font-medium text-base">Coupon Name</p>
          <input
            name="name"
            className="text-graydarktext w-4/5 p-1 px-3 rounded-md border border-graylighticon"
            value={inputCoupon.voucher.name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-graydarktext font-medium text-base">
            Coupon Code (6 - 10 characters)
          </p>
          <input
            name="code"
            className="text-graydarktext w-4/5 p-1 px-3 rounded-md border border-graylighticon"
            value={inputCoupon.voucher.code}
            onChange={handleChangeInput}
          />
          <small className="text-red-500">{inputError?.voucher?.code}</small>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-graydarktext font-medium text-base">Description</p>
          <input
            name="description"
            className="text-graydarktext w-4/5 p-1 px-3 rounded-md border border-graylighticon"
            value={inputCoupon.voucher.description}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-graydarktext font-medium text-base">Condition</p>
          <input
            name="condition"
            className="text-graydarktext w-4/5 p-1 px-3 rounded-md border border-graylighticon"
            value={inputCoupon.voucher.condition}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-graydarktext font-medium text-base">
            Discount (%)
          </p>
          <input
            name="discount"
            className="text-graydarktext w-4/5 p-1 px-3 rounded-md border border-graylighticon"
            value={inputCoupon.voucher.discount}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-graydarktext font-medium text-base">
            Total Amount of Coupons
          </p>
          <input
            name="totalAmount"
            className="text-graydarktext w-4/5 p-1 px-3 rounded-md border border-graylighticon"
            value={inputCoupon.voucher.totalAmount}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-graydarktext font-medium text-base">
            Upload Coupon Cover Photo
          </p>
          <div className="flex flex-col rounded-xl">
            <input
              type="file"
              ref={fileEl}
              className="hidden"
              name="voucherImage"
              onChange={handleUploadFile}
            />
            {inputCoupon.voucherImage ? (
              <div
                onClick={() => fileEl.current.click()}
                className="w-4/5 h-24 xl:h-40 hover:cursor-pointer"
              >
                <img
                  className="rounded-lg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  src={getImageSrc()}
                  alt="Event coupon image"
                />
              </div>
            ) : (
              <div className="w-4/5 h-full flex justify-center border-graydarktext border-opacity-40 border-2 border-dashed rounded-xl">
                <button
                  onClick={() => fileEl.current.click()}
                  className="p-2 group flex flex-col justify-center items-center w-fit h-fit"
                >
                  <div className="bg-absolutewhite group-hover:bg-graybg w-12 h-12 rounded-full flex justify-center items-center">
                    <UploadIcon />
                  </div>
                  <p className="text-darkgreen underline group-hover:text-darkbrown">
                    Browse
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-5/12 flex flex-col items-center pt-8">
        <p className="text-primary font-medium text-2xl">Coupon Preview</p>
        <CouponFullRightTab
          storeName={myStoreProfile.storeName}
          eventName={input.name}
          voucherCondition={inputCoupon.voucher.condition}
          voucherDescription={inputCoupon.voucher.description}
          eventStartDate={input.startDate}
          eventEndDate={input.endDate}
          voucherCode={inputCoupon.voucher.code}
          voucherImage={inputCoupon.voucherImage}
        />
      </div>
    </div>
  );
}
