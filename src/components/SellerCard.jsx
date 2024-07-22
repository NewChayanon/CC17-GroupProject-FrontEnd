import React from "react";
import { useNavigate } from "react-router-dom";

export default function SellerTabCard({ selectedEventDetails }) {
  const navigate = useNavigate();
  const handleClickSeeSellerPage = (e) => {
    console.log(e);
    // navigate to seller page and fetch seller data
    navigate(`/store/${e.target.id}/profile`);
  };
  return (
    <div>
      <div style={{ overflow: "hidden" }}>
        <img
          style={{
            height: "226px",
            width: "389px",
            objectFit: "cover",
            display: "block",
          }}
          src={selectedEventDetails.storeCoverImage}
          alt="event image"
        />
      </div>
      <div className="relative">
        <div className="absolute left-8 -top-10 text-center">
          <img
            className="2"
            style={{
              height: "112px",
              width: "112px",
              objectFit: "cover",
              display: "block",
              borderRadius: "50%",
            }}
            src={selectedEventDetails.sellerCoverImage}
          />
          <div className="text-2xl font-bold py-2">
            {selectedEventDetails.sellerFirstName}
          </div>
        </div>
        <div className="pl-44 py-4">
          <button
            id={selectedEventDetails.storeId}
            onClick={handleClickSeeSellerPage}
            className="text-2xl font-bold"
          >
            {selectedEventDetails.storeName}
          </button>
          <div className="pl-2">
            <div className="text-sm text-primary">
              {" "}
              {selectedEventDetails.countFollower} followers
            </div>
            <div className="text-sm text-primary">
              {selectedEventDetails.countEventOfSeller} events
            </div>
            <div className="text-sm text-primary">
              {selectedEventDetails.sumVoucherSeller} coupons
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
