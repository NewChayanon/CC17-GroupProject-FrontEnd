import React from "react";
import { LocationIcon, ThumbsupIcon } from "../../icons";

export default function EventCard({ event }) {
  return (
    <div
      className="p-2 border shadow flex flex-col gap-2"
      style={{ height: "180px", width: "249px" }}
    >
      <img
        className="rounded-md"
        style={{ height: "116px", width: "249px" }}
        src="https://picsum.photos/seed/picsum/200/200"
        alt="event image"
      />
      <div className="flex justify-between items-end">
        <div className="w-2/3">
          <p style={{ fontSize: "8px" }}>
            {event.eventStartDate} - {event.eventEndDate}
          </p>
          <p style={{ fontSize: "12px", fontWeight: "bold" }}>
            {event.storeName}
          </p>
          <div className="flex">
            <LocationIcon />
            {/* <p style={{ fontSize: "8px" }}>{event.eventLocation}</p> */}
            <p style={{ fontSize: "8px" }}> Placeholder Location </p>
          </div>
        </div>
        <div className="w-1/3">
          {true && (
            <p
              className="bg-secondary flex gap-1 text-primary py-0.5 px-1 rounded-sm"
              style={{ fontSize: "8px" }}
            >
              <p>Recommended</p>
              <ThumbsupIcon />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
