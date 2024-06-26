import React from "react";
import EventTabCard from "../../components/EventTabCard";
import Button from "../../components/Button";
import SellerCard from "../../components/SellerCard";
import SellerTabCard from "../../components/SellerCard";

export default function SellerSummaryCard({ sellerDetails }) {
  return (
    <div className="bg-white" style={{ height: "360px", width: "430px" }}>
      <div className="bg-white p-6 rounded-xl flex flex-col justify-center gap-6">
        <div className="text-xl font-bold">Seller of this event</div>
        <SellerTabCard sellerDetails={sellerDetails} />
      </div>
    </div>
  );
}
