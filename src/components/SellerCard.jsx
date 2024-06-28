import React from "react";

export default function SellerTabCard({ selectedEventDetails }) {
  return (
    <div className="bg-teal-100">
      <div>
        <img src="" />
      </div>
      <div>Seller Photo and Name - </div>
      <div>
        <div className="text-xl font-bold">
          {selectedEventDetails.storeName}
        </div>
        <div>
          <div className="text-base text-primary">Placeholder followers</div>
          <div className="text-base text-primary">Placeholder events</div>
          <div className="text-base text-primary">Placeholder vouchers</div>
        </div>
      </div>
    </div>
  );
}
