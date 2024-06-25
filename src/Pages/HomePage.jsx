import { useEffect, useState } from "react";
import EventCarousel from "../features/home/EventCarousel";
import getCurrentLocation from "../features/map/get-current-location";
import MapPane from "../features/map/MapPane";
import EventSummaryCard from "../features/home/EventSummaryCard";
import SellerSummaryCard from "../features/home/SellerSummaryCard";

// Fetch Event from API instead of using mockup Array
const initialEventArray = [
  { position: { lat: 13.74, lng: 100.52 }, eventDetails: "Event1", key: 1 },
  { position: { lat: 13.78, lng: 100.49 }, eventDetails: "Event2", key: 2 },
  { position: { lat: 13.75, lng: 100.51 }, eventDetails: "Event3", key: 3 },
  { position: { lat: 13.75, lng: 100.51 }, eventDetails: "Event3", key: 4 },
  { position: { lat: 13.75, lng: 100.51 }, eventDetails: "Event3", key: 5 },
  { position: { lat: 13.75, lng: 100.51 }, eventDetails: "Event3", key: 6 },
  { position: { lat: 13.75, lng: 100.51 }, eventDetails: "Event3", key: 7 },
  { position: { lat: 13.75, lng: 100.51 }, eventDetails: "Event3", key: 8 },
];
const defaultLocation = { lat: 13.76, lng: 100.5 }; // Bangkok Location

export default function HomePage() {
  const [eventArray, setEventArray] = useState(initialEventArray);
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [selectedEventId, setSelectedEventId] = useState(1); // change to "" later after test
  const [selectedEventDetails, setSelectedEventDetails] = useState({}); // เอา eventId ไปเรียก event Details มาแล้วเอามา set state ทีหลัง

  // Try getting current location
  // Then, Fetch Event List based on Current Location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const result = await getCurrentLocation();
        console.log("result from getcurrentlocation", result);
        setCurrentLocation(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocation();
  }, []);
  // Get the event from Database
  useEffect(() => {
    const fetchEvent = async () => {
      try {
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);
  // Get one event from Database after user selects one particular event

  return (
    <div>
      <div className="relative">
        {/*==================== Search Box===================*/}
        <div className="absolute">
          <input
            className="z-40 w-100 h-9 bg-white"
            type="text"
            placeholder="Search"
          ></input>
        </div>
        {/*==================== MAP ===================*/}
        {/* <div
          className="bg-red-200 z-10"
          style={{ height: "286px", width: "430px" }}
        >
          Map Mock
        </div> */}
        <div className="z-10">
          <MapPane
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            eventArray={eventArray}
            setEventArray={setEventArray}
          />
        </div>
      </div>
      {/*==================== EVENT CAROUSEL (EVENT LIST NEAR ME) ===================*/}
      <div>
        <EventCarousel
          eventArray={eventArray}
          setEventArray={setEventArray}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
        />
      </div>
      {/*==================== EVENT DETAILS (selected event) ===================*/}
      {selectedEventId && (
        <div className="flex flex-col">
          <EventSummaryCard selectedEventDetails={selectedEventDetails} />
          <SellerSummaryCard selectedEventDetails={selectedEventDetails} />
        </div>
      )}
    </div>
  );
}
