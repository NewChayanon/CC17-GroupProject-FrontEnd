import React from "react";

export default function CouponTab() {
  return (
    <div
      className="shadow-lg flex relative"
      style={{ width: "100%", height: "120px" }}
    >
      <div style={{ maxHeight: "230px", overflow: "hidden" }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          src="https://picsum.photos/id/237/300/200"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-base text-primary">Durian Lovelove</div>
        <div className="text-base ">Halloween Super Discount</div>
        <div className="text-xs">
          Description of the coupon is shown here for 3 lines in total.
          Description of the coupon is shown here for 3 lines.
        </div>
        <div className="flex justify-between">
          <div className="text-xs">Validity: 15-20 May 2023</div>
          <div className="text-xs">#LUCKYDAY12</div>
        </div>
      </div>
      <div className="absolute bg-white rounded-full w-5 h-5 -left-2 top-1/2 transform -translate-y-1/2"></div>
      <div className="absolute bg-white rounded-full w-5 h-5 -right-2 top-1/2 transform -translate-y-1/2"></div>
    </div>
  );
}
