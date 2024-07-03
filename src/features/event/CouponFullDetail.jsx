import React from 'react'
import { QrcodeIcon } from '../../icons'

export default function CouponFullDetail({selectedEventDetails}) {
  return (
    <div
    className="shadow-lg flex flex-col bg-graybg items-center rounded-xl relative px-8 py-8 gap-4"
    style={{ width: "100%", minHeight:"100px" }}
  >
    <div className="flex items-center" style={{ maxHeight: "104px", overflow: "hidden"}}>
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
    <div className="text-graylighttext font-extrabold">&#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211;</div>
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32">
        <QrcodeIcon/>
      </div>
      <div className="text-xs text-graylighttext"> This QR code is valid until 20 May 2024</div>
    </div>
    <div className="absolute bg-white rounded-full w-8 h-8 -left-4 top-1/2 transform -translate-y-1/2"></div>
    <div className="absolute bg-white rounded-full w-8 h-8 -right-4 top-1/2 transform -translate-y-1/2"></div>
  </div>
  )
}
