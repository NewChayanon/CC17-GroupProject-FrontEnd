import React from "react";

export default function EventCover() {
  return (
    <div
      className="flex items-center bg-red-500 "
      style={{ maxHeight: "230px", overflow: "hidden" }}
    >
      {/* <img src={selectedEventDetails.eventImage} /> */}
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        src="https://picsum.photos/400"
      />
    </div>
  );
}
