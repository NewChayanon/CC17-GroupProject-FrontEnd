import React from "react";

export default function EventCard({ event }) {
  return (
    <div
      className="p-2 border shadow"
      style={{ height: "180px", width: "249px" }}
    >
      <img
        className="rounded-md"
        style={{ height: "116px", width: "225px" }}
        src="https://picsum.photos/seed/picsum/200/200"
        alt="event image"
      />
      <div className="flex justify-between">
        <div>
          <p style={{ fontSize: "8px" }}>Date</p>
          <p style={{ fontSize: "12px", fontWeight: "bold" }}>Store Name</p>
          <p style={{ fontSize: "8px" }}>Location</p>
        </div>
        <div>
          <p style={{ fontSize: "8px" }}>Price</p>
        </div>
      </div>
    </div>
  );
}
