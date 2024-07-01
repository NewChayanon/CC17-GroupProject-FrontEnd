import React from "react";

export default function StoreCover({selectedStoreDetails={}}) {
  return (
    <div
      className="flex items-center bg-red-500 "
      style={{ maxHeight: "230px", overflow: "hidden" }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        src={selectedStoreDetails?.storeCoverImage}
      />
    </div>
  );
}
