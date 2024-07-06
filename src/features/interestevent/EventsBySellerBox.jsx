import React from "react";
import EventTabCard from "../../components/EventTabCard";

export default function EventsBySellerBox({
  eventsObjectBySeller,
  index,
  setUpdateInterestEventStatus,
}) {
  let isEven;
  if (index % 2 === 0) {
    isEven = true;
  } else {
    isEven = false;
  }
  console.log("event object by seller", eventsObjectBySeller);
  const sellerName = Object.keys(eventsObjectBySeller)[0];
  console.log("seller name", sellerName);
  const eventArray = Object.values(eventsObjectBySeller)[0];
  console.log("event array by seller", eventArray);

  return (
    <div className={`p-6 ${isEven ? "bg-graybg" : "bg-white"}`}>
      <div className="text-primary text-xl font-bold">{sellerName}</div>
      {eventArray.map((event, index) => (
        <EventTabCard
          selectedEventDetails={event}
          isFullVersion={false}
          key={index}
          hasCoupon={true}
          setUpdateInterestEventStatus={setUpdateInterestEventStatus}
        />
      ))}
    </div>
  );
}
