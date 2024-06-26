import React from "react";
import Button from "../../components/Button";
import EventTabCard from "../../components/EventTabCard";

export default function EventSummaryCard({ selectedEventDetails }) {
  return (
    <div style={{ height: "360px", width: "430px" }}>
      <div className="bg-white m-6 p-6 rounded-xl flex flex-col justify-center items-end gap-6">
        <EventTabCard selectedEventDetails={selectedEventDetails} />
        <Button>See the deal</Button>
      </div>
    </div>
  );
}
