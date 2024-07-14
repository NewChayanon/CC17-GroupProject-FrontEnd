import React from "react";
import { LocationIcon, ThumbsupIcon } from "../../icons";
import { formatDateString } from "../../utils/datetime-conversion";

export default function EventCard({ event }) {
  return (
    <div className="p-2 shadow-md flex flex-col gap-2 w-[249px] h-[180px] ">
      <img
        className="rounded-md w-[249px] h-[116px]"
        src={event.eventImage}
        alt="event image"
      />
      <div className="flex justify-between items-center">
        <div className="w-2/3">
          <p style={{ fontSize: "8px" }}>
            {formatDateString(event.eventStartDate)} -{" "}
            {formatDateString(event.eventEndDate)}
          </p>
          <p style={{ fontSize: "12px", fontWeight: "bold" }}>
            {event.storeName}
          </p>
          <div className="flex items-start">
            <LocationIcon iconColor="red" />
            {/* <p style={{ fontSize: "8px" }}>{event.eventLocation}</p> */}
            <p style={{ fontSize: "8px" }}> {event.eventLocationName} </p>
          </div>
        </div>
        <div className="w-1/3">
          {event.countFollower >= 3 && (
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
