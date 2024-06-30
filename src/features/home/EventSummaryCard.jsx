import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import EventTabCard from "../../components/EventTabCard";

export default function EventSummaryCard({
  selectedEventDetails,
  selectedEventId,
}) {
  const navigate = useNavigate();
  const handleGoToEventPage = (e) => {
    // navigate to path event/:eventId/detail
    navigate(`../event/${selectedEventId}/detail`);
  };
  return (
    <div style={{ minHeight: "360px", width: "430px" }}>
      <div className="bg-white m-6 p-6 rounded-xl flex flex-col justify-center items-end gap-6">
        <EventTabCard selectedEventDetails={selectedEventDetails} />
        <Button onClick={handleGoToEventPage}>See the deal</Button>
      </div>
    </div>
  );
}
