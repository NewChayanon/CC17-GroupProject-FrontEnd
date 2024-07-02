import React from "react";
import CouponFullDetail from "./CouponFullDetail";
import CouponTab from "./CouponTab";

export default function CouponDetailModal({ selectedEventDetails, onCloseModal }) {
  return (
    <div className="flex flex-col p-2 gap-4 items-center">
    <CouponFullDetail selectedEventDetails={ selectedEventDetails}/>
      <div className="text-sm text-graydarktext text-center px-4">
        You may view the collected coupons in the dropdown menu on the top right
        of the page.
      </div>
      <div className="text-xl text-graydarktext px-4">Happy coupon collecting! &#58;&#41; </div>
      <div className="text-primary self-end" onClick={onCloseModal}> &#60; Back to Event</div>
    </div>
  );
}
