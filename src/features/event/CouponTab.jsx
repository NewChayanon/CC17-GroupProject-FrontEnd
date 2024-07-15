import React, { useState } from "react";
import userApi from "../../apis/user";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { voucherStatus } from "../../constants/voucher-constant";
import CouponDetailModal from "./CouponDetailModal";
import { toast } from "react-toastify";
import { formatDateString } from "../../utils/datetime-conversion";

// NOTE: Coupon tab ใช้แสดงผลใน 2 menu 1) event/promotion 2) user/collected-coupon
export default function CouponTab({
  selectedEventDetails,
  useEnabled = false,
  setIsCouponCollected,
}) {
  const [openModal, setOpenModal] = useState(false); // {/* State for modal in case if user can get voucher */}
  // ถ้า useEnabled = true และ userVoucherStatus = "COLLECTED" >> สามารถกดใช้งาน voucher ได้
  // 1. มี modal เด้งขึ้นมา และมีปุ่มกดใช้ได้ โดยแสดงรายละเอียดของ voucher นั้นๆ (reuse modal เดิมใน promotion page)
  const handleOpenCouponDetailModal = (e) => {
    // Check ก่อน ว่า voucher นั้นๆ 1) เป็น voucher ที่อยู่ในหน้า Collected Coupon หรือไม่ และ 2) userVoucherStatus เป็น "COLLECTED" หรือไม่ ถ้าตรงเงื้อนไข ถ7งจะเปิด modal มาให้กดใช้ voucher ได้
    if (
      selectedEventDetails.voucherItemId &&
      selectedEventDetails.userVoucherStatus === voucherStatus.COLLECTED
    ) {
      setOpenModal(true);
    } else alert("cannot use coupon");
  };
  // 2. ถ้ากด use coupon แล้ว >> ยิง api ไปบอกหลังบ้านว่าใช้งานแล้ว โดยระบุ voucherItemId
  // 3. ถ้า use coupon success >> ปิด modal & refresh page >> status เปลี่ยนเป็น "used"
  const handleUseCoupon = async (e) => {
    try {
      const result = await userApi.useCoupon(
        selectedEventDetails.voucherItemId
      );
      console.log("result from API to use coupon", result.data.msg);
      toast.success("Coupon is used successfully!");
      setIsCouponCollected(true);
      setOpenModal(false);
    } catch (err) {
      console.log("Error from API to use coupon", err);
    }
  };

  return (
    <div
      type="button"
      onClick={handleOpenCouponDetailModal}
      className="shadow-lg flex rounded-xl relative px-4 gap-4 w-full h-[120px] hover:scale-95 active:scale-95"
    >
      <div className="absolute bg-white rounded-full w-8 h-8 -left-4 top-1/2 transform -translate-y-1/2"></div>
      <div className="absolute bg-white rounded-full w-8 h-8 -right-4 top-1/2 transform -translate-y-1/2"></div>
      {/* ======Voucher image========= */}
      <div className="max-h-[230px] overflow-hidden">
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          src="https://i.pinimg.com/736x/be/3f/5d/be3f5d61a8d2059bfd16c10e8c08f552.jpg"
        />
      </div>
      {/* ======Voucher Details ========= */}
      <div className="flex flex-col">
        <div className="text-base text-primary">
          {selectedEventDetails.sellerName}
        </div>
        <div className="text-base ">{selectedEventDetails.eventName}</div>
        <div className="text-xs">
          {selectedEventDetails?.voucherItem?.voucherCondition ||
            selectedEventDetails?.voucherCondition}
        </div>
        <div className="flex justify-between">
          <div className="text-xs">
            Validity: {formatDateString(selectedEventDetails.eventStartDate)} -{" "}
            {formatDateString(selectedEventDetails.eventEndDate)}
          </div>
          <div className="text-xs">
            Code:{" "}
            {selectedEventDetails?.voucherItem?.voucherCode ||
              selectedEventDetails?.voucherCode}
          </div>
        </div>
      </div>
      {/* ====== Check if User is in event page, and if they already collect voucher or not. if yes. show" collected" */}
      {selectedEventDetails.voucherItem?.userVoucherStatus[0] ? (
        <>
          <div className="absolute w-full h-full bg-white opacity-70 "></div>
          <div className="absolute w-full h-full bg-gray flex justify-center items-center text-2xl font-bold text-primary -rotate-12">
            --Collected!--
          </div>
        </>
      ) : null}
      {/* ====== Check if user is inside "collected coupon" page or not, and check their coupon status" if*/}
      {selectedEventDetails.userVoucherStatus === voucherStatus.EXPIRED ||
      selectedEventDetails.userVoucherStatus === voucherStatus.USED ? (
        <>
          <div className="absolute w-full h-full bg-white opacity-50 "></div>
          <div className="absolute w-full h-full bg-gray flex justify-center items-center text-2xl font-bold text-tertiary -rotate-12">
            {`--- ${selectedEventDetails.userVoucherStatus} ---`}
          </div>
        </>
      ) : null}
      {/*===== If user is inside "collected coupon" and status ="COLLECTEC" they can click on the coupon and modal appears=======*/}
      {/*===== If they click "Use coupon now" =======*/}
      <Modal
        width="small"
        title="Coupon Details"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-4 items-center">
          <CouponDetailModal
            selectedEventDetails={selectedEventDetails}
            useEnabled={useEnabled}
          />
          <Button width="large" onClick={handleUseCoupon}>
            Use this coupon now!
          </Button>
          <div className="text-xs text-red-500">
            (This button is to be clicked by the seller)
          </div>
        </div>
      </Modal>
    </div>
  );
}
