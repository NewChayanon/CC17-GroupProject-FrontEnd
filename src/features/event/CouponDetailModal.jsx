import React from "react";
import CouponFullDetail from "./CouponFullDetail";
import CouponTab from "./CouponTab";

export default function CouponDetailModal({ selectedEventDetails, onCloseModal }) {
  // เดี๋ยวเอาข้อมูลจาก event details มาใช้
  return (
    <div className="flex flex-col items-center">
    <CouponFullDetail couponDetail={ selectedEventDetails}/>
      <div className="text-sm">
        You may view the collected coupons in the dropdown menu on the top right
        of the page.
      </div>
      <div className="text-xl">Happy coupon collecting!</div>
      <div className="text-primary" onClick={onCloseModal}> &#60; Back to Event</div>
    </div>
  );
}
