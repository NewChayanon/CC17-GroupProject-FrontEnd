import React from "react";
import EventCard from "./EventCard";

export default function EventCarousel({
  eventArray,
  setEventArray,
  selectedEventId,
  setSelectedEventId,
  setSelectedEventDetails,
}) {
  console.log("event array in carousel component", eventArray);
  return (
    <div className="w-[425px]">
      <div className="bg-white p-4 flex flex-col gap-2 h-[235px] w-full">
        <p className="text-sm font-bold">Current Popular Events</p>
        {/* List of Event from Event Array*/}
        <div className="carousel rounded-box h-[180px] w-screen ">
          {eventArray.map((event) => (
            <div
              className="carousel-item relative"
              key={event.key}
              // onClick={() => setSelectedEventId(event.id)}
            >
              <div
                className="border border-red absolute"
                style={{ height: "180px", width: "249px" }}
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
    </div>
  );
}
