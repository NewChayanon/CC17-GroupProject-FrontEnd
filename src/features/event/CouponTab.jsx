import React from "react";

export default function CouponTab({ selectedEventDetails }) {
  return (
    <div
      className="shadow-lg flex rounded-xl relative px-4 gap-4"
      style={{ width: "100%", height: "120px" }}
    >
      <div className="" style={{ maxHeight: "230px", overflow: "hidden" }}>
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
      <div className="flex flex-col">
        <div className="text-base text-primary">
          {selectedEventDetails.sellerName}
        </div>
        <div className="text-base ">Halloween Super Discount</div>
        <div className="text-xs">{selectedEventDetails.voucherCondition}</div>
        <div className="flex justify-between">
          <div className="text-xs">
            Validity: {selectedEventDetails.eventStartDate} -{" "}
            {selectedEventDetails.eventEndDate}
          </div>
          <div className="text-xs">
            Code: {selectedEventDetails.voucherCode}
          </div>
        </div>
      </div>
      {/* Check if User already has voucher or not. If yes, show "Collected" */}
      {selectedEventDetails.voucherItem.userVoucherStatus[0]?(
      <><div className="absolute w-full h-full bg-white opacity-50 "></div>
      <div className="absolute w-full h-full bg-gray flex justify-center items-center text-2xl font-bold text-red-500 -rotate-12">--Collected!--</div>
      </>
      ):null}
      <div className="absolute bg-white rounded-full w-8 h-8 -left-4 top-1/2 transform -translate-y-1/2"></div>
      <div className="absolute bg-white rounded-full w-8 h-8 -right-4 top-1/2 transform -translate-y-1/2"></div>
    </div>
  );
}
