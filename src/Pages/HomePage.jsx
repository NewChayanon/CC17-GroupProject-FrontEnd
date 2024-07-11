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
import EmptyState from "../components/EmptyState";
import { CouponIcon } from "../icons";
import DurianLogoBW from "../icons/DurianLogoBW";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../utils/local-storage";

// Fetch Event from API instead of using mockup Array
const defaultLocation = { lat: 13.76, lng: 100.5 }; // Bangkok Location

export default function HomePage() {
  const [eventArray, setEventArray] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [selectedEventId, setSelectedEventId] = useState(""); // change to "" later after test
  const [selectedEventDetails, setSelectedEventDetails] = useState({}); // เอา eventId ไปเรียก event Details มาแล้วเอามา set state ทีหลัง
  const [token, setToken] = useState(null);
  const getAuthUser = useStore((state) => state.getAuthUser);
  const logoutModal = useStore((state) => state.logoutModal);
  const navigate = useNavigate();
  // Get current location of user and setCurrentLocation
  const fetchLocation = async () => {
    try {
      const result = await getCurrentLocation();
      console.log("result from getcurrentlocation", result);
      setCurrentLocation((prev) => result);
    } catch (err) {
      console.log(err);
    }
  };
  // Useeffect to fetch current location
  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const result = await getCurrentLocation();
  //       console.log("result from getcurrentlocation", result);
  //       setCurrentLocation((prev) => result);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchLocation();
  // }, []);
  useEffect(() => {
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

  // useEffect(() => {
  //   console.log("Running useEffect to update token");
  //   const query = new URLSearchParams(window.location.search);
  //   const tokenFromUrl = query.get("token");
  //   if (tokenFromUrl) {
  //     const base64Token = decodeURIComponent(tokenFromUrl);
  //     localStorage.setItem("token", base64Token);
  //     setToken(base64Token); // Store the decoded token
  //     // window.history.replaceState({}, document.title, "/");

  //     const response = await login(input);
  //     navigate("/home");
  //   }
  // }, []);
  useEffect(() => {
    console.log("Running useEffect to update token");
    const getTokenFromUrl = async () => {
      try {
        const query = new URLSearchParams(window.location.search);
        const tokenFromUrl = query.get("token");

        if (tokenFromUrl) {
          const base64Token = decodeURIComponent(tokenFromUrl);
          setAccessToken(base64Token);
          // localStorage.setItem("token", base64Token);
          setToken(base64Token); // Store the decoded token
          // Assuming `login` is an asynchronous function that handles login
          // Navigate to the home page or wherever you need after successful login
          // navigate("/home");
          const result = await getAuthUser(); // Adjust the arguments as per your login function
          console.log("result from getAuthUser", result);
        } else {
          // Handle login failure if necessary
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error while processing token:", error);
        // Handle error if necessary
      }
    };
    getTokenFromUrl();
  }, []);

  return (
    <div className="flex flex-col w-auto h-full">
      <div className="relative w-auto">
        {/*==================== MAP Component ===================*/}

        <Map
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          eventArray={eventArray}
          setEventArray={setEventArray}
          setSelectedEventId={setSelectedEventId}
          setSelectedEventDetails={setSelectedEventDetails}
          fetchLocation={fetchLocation}
        />
      </div>
      {/*==================== EVENT CAROUSEL (EVENT LIST NEAR ME) ===================*/}
      <div>
        {eventArray[0] ? (
          <EventCarousel
            eventArray={eventArray}
            setEventArray={setEventArray}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            setSelectedEventDetails={setSelectedEventDetails}
          />
        ) : (
          <EmptyState
            message="Oops.. We can't find the event you are looking for"
            icon={<DurianLogoBW />}
          ></EmptyState>
        )}
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
