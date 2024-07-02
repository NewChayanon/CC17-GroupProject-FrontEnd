import React from 'react'

export default function CouponFullDetail({selectedEventDetails}) {
  console.log("Event details inside full coupon", selectedEventDetails)
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
        {selectedEventDetails.sellerFirstName}
      </div>
      <div className="text-base ">Halloween Super Discount</div>
      <div className="text-xs">{selectedEventDetails.voucherItem.voucherCondition}</div>
      <div className="flex justify-between">
        <div className="text-xs">
          Validity: {selectedEventDetails.eventStartDate} -{" "}
          {selectedEventDetails.eventEndDate}
        </div>
        <div className="text-xs">
          Code: {selectedEventDetails.voucherItem.voucherCode}
        </div>
      </div>
    </div>
    <div className="absolute bg-white rounded-full w-8 h-8 -left-4 top-1/2 transform -translate-y-1/2"></div>
    <div className="absolute bg-white rounded-full w-8 h-8 -right-4 top-1/2 transform -translate-y-1/2"></div>
  </div>
  )
}
