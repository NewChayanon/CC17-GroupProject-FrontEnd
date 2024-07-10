import React from "react";
import { sortEvents } from "../../utils/sorting-function";
import EventCard from "./EventCard";

export default function EventCarousel({
  eventArray,
  setEventArray,
  selectedEventId,
  setSelectedEventId,
  setSelectedEventDetails,
}) {
  console.log("event array in carousel component", eventArray);
  // 1) sort array based on number of followers
  const sortedEventArray = sortEvents(eventArray);
  console.log("event array in carousel component", eventArray);
  return (
    <div className="bg-white p-4 flex flex-col gap-2 h-[240px] w-[425px]">
      <p className="text-sm font-bold">Current Popular Events</p>
      {/* List of Event from Event Array*/}
      <div className="carousel rounded-box h-[240px] w-screen">
        {sortedEventArray.map((event) => (
          <div className="carousel-item relative" key={event.key}>
            <div
              className="absolute h-[180px] w-[249px] "
              onClick={() => {
                setSelectedEventId(event.id);
                setSelectedEventDetails(event);
              }}
            ></div>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
