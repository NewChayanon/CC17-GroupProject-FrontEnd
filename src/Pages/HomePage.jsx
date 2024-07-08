import { useEffect, useState } from "react";
import EventCarousel from "../features/home/EventCarousel";
import getCurrentLocation from "../features/map/get-current-location";
import MapPane from "../features/map/MapPane";
import EventSummaryCard from "../features/home/EventSummaryCard";
import SellerSummaryCard from "../features/home/SellerSummaryCard";
import SearchBar from "../components/SearchBar";
import authApi from "../apis/auth";
import Modal from "../components/Modal";
import useStore from "../zustand/store";
import LogoutModal from "../components/LogoutModal";
import Places from "../features/map/Places";
import Map from "../features/map/MainMap";

// Fetch Event from API instead of using mockup Array
const initialEventArray = [];
const defaultLocation = { lat: 13.76, lng: 100.5 }; // Bangkok Location

export default function HomePage() {
  const [eventArray, setEventArray] = useState(initialEventArray);
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [selectedEventId, setSelectedEventId] = useState(""); // change to "" later after test
  const [selectedEventDetails, setSelectedEventDetails] = useState({}); // เอา eventId ไปเรียก event Details มาแล้วเอามา set state ทีหลัง

  const logoutModal = useStore((state) => state.logoutModal);

  // Get current location of user and setCurrentLocation
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const result = await getCurrentLocation();
        console.log("result from getcurrentlocation", result);
        setCurrentLocation((prev) => result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocation();
  }, []);

  // Use current location to Get the event from Database by sending the current lat & lng of users
  useEffect(() => {
    const params = {};
    params.userLocation = currentLocation.lat + "," + currentLocation.lng;
    console.log("params", params);
    const fetchEventNearMe = async (params) => {
      try {
        console.log("API request params", params);
        const result = await authApi.getNearMe(params);
        console.log(
          "Main Homepage: result from get nearMe(first download only",
          result
        );
        setEventArray(result.data);
      } catch (err) {
        console.log("error from fetching event near me API", err);
      }
    };
    fetchEventNearMe(params);
    // }
  }, [currentLocation]);

  return (
    <div className="flex flex-col w-auto h-auto">
      <div className="relative w-auto">
        {/*==================== Search Box===================*/}
        <div
          className="absolute z-40 px-3"
          style={{ top: "30px", margin: "auto" }}
        >
          <SearchBar eventArray={eventArray} setEventArray={setEventArray} />
        </div>
        {/*==================== MAP ===================*/}

        <Map
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          eventArray={eventArray}
          setEventArray={setEventArray}
        />
      </div>
      {/*==================== EVENT CAROUSEL (EVENT LIST NEAR ME) ===================*/}
      <div>
        <EventCarousel
          eventArray={eventArray}
          setEventArray={setEventArray}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          setSelectedEventDetails={setSelectedEventDetails}
        />
      </div>
      {/*==================== EVENT DETAILS (selected event) ===================*/}
      {selectedEventId && (
        <div className="flex flex-col">
          <EventSummaryCard
            selectedEventDetails={selectedEventDetails}
            selectedEventId={selectedEventId}
          />
          <SellerSummaryCard selectedEventDetails={selectedEventDetails} />
        </div>
      )}
      <Modal
        open={logoutModal}
        onClose={() => window.location.reload()}
        width="small"
        title="You have already logged out from the system!"
      >
        <LogoutModal />
      </Modal>
    </div>
  );
}
