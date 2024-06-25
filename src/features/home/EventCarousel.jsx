import React from "react";
import EventCard from "./EventCard";

export default function EventCarousel({
  eventArray,
  setEventArray,
  selectedEventId,
  setSelectedEventId,
}) {
  console.log("event array in carousel component", eventArray);
  return (
    <div
      className="bg-white p-4 flex flex-col gap-2"
      style={{ height: "235px", width: "430px" }}
    >
      <p className="text-sm font-bold">Current Popular Events</p>
      {/* List of Event from Event Array*/}
      <div
        className="carousel rounded-box"
        style={{ height: "180px", maxWidth: "430px" }}
      >
        {eventArray.map((event) => (
          <div
            className="carousel-item"
            key={event.key}
            onClick={() => setSelectedEventId(event.id)}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
