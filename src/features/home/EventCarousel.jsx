import React from "react";
import EventCard from "./EventCard";

export default function EventCarousel({ eventArray, setEventArray }) {
  console.log("event array in carousel component", eventArray);
  return (
    <div
      className="border border-red-700"
      style={{ height: "235px", width: "430px" }}
    >
      <p>Current Popular Events</p>
      {/* List of Event from Event Array*/}
      <div
        className="carousel rounded-box"
        style={{ height: "180px", maxWidth: "430px" }}
      >
        {eventArray.map((event) => (
          <div className="carousel-item">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
