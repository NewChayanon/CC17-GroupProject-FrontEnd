import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import eventApi from "../../apis/event";
import EventTabCard from "../../components/EventTabCard";
import useStore from "../../zustand/store";

export default function EventDetail() {
  const { pathname } = useLocation();
  // Call API to get all event details - async await & keep data in state
  const setEventId = useStore((state) => state.setEventId);
  const eventId = useStore((state) => state.eventId);
  const eventIdfromPath = pathname.split("/")[2];
  setEventId(eventIdfromPath);
  /// กรณี้ update Event Details ด้วย useState
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  useEffect(() => {
    const fetchEventDetails = async (eventId) => {
      try {
        const result = await eventApi.getEventById(eventId);
        console.log("result from gettind event details");
        // เรียก update
        setSelectedEventDetails(result.data);
      } catch (err) {
        console.log("error from geteventdetailapi", err);
      }
    };
    fetchEventDetails(eventId);
  }, []);

  // const selectedEventDetails = useStore((state) => state.selectedEventDetails); // ข้อมูลมา
  // const setSelectedEventDetails = useStore(
  //   (state) => state.setSelectedEventDetails
  // );
  // useEffect(() => {
  //   setSelectedEventDetails(eventId);
  // }, []);

  return (
    <div>
      {/* ============ EventDetail Event Details ============ */}
      <div className="flex justify-center p-6 bg-white">
        {selectedEventDetails && (
          <EventTabCard selectedEventDetails={selectedEventDetails} />
        )}
      </div>
      <div className="bg-secondary" style={{ height: "250px" }}>
        <img src="" />
        <img src="" />
      </div>
      <div className="flex flex-col p-6">
        <div className="text-xl font-bold">Other Events from this seller</div>
        <div>
          {selectedEventDetails &&
            selectedEventDetails.eventOther.map((otherEvent) => (
              <EventTabCard
                selectedEventDetails={otherEvent}
                isFullVersion={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
