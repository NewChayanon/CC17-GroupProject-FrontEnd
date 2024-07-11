"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import getCurrentLocation from "../../map/get-current-location";
import useStore from "../../../zustand/store";

const libraries = ["places", "core", "maps", "marker"];
const defaultLocation = { lat: 13.76, lng: 100.5 };

export default function SellerMap({
  setLocationParent,
  small = false,
  handlePin,
}) {
  const mapRef = useRef(null);
  const placeAutoCompleteRef = useRef(null);
  const [map, setMap] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [center, setCenter] = useState(defaultLocation);
  const [clickedLocation, setClickedLocation] = useState(null); // State to hold the clicked location
  const [marker, setMarker] = useState(null); // State to hold the marker instance
  const storeDetail = useStore((state) => state.storeDetail);
  const selectedEvent = useStore((state) => state.selectedEvent);

  const eventArray = storeDetail.myEvent;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const result = await getCurrentLocation();
        console.log("result from getcurrentlocation", result);
        setCenter(result);
      } catch (err) {
        console.log(err);
      }
    };
    if (!selectedEvent) fetchLocation();
    else {
      const positionArr = selectedEvent.eventLocation.split(",");
      const position = {
        lat: +positionArr[0],
        lng: +positionArr[1],
      };
      setCenter(position);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapOptions = {
        center: center,
        zoom: zoomLevel,
        minZoom: 10,
        maxZoom: 18,
        mapId: import.meta.env.VITE_GOOGLE_MAP_MAP_ID,
      };
      // Create a map instance
      const gMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(gMap);
      console.log("Map instantiated done");

      // Add click listener to map
      gMap.addListener("click", (event) => {
        const latLng = event.latLng;
        console.log("Map clicked at", latLng.toString());
        setClickedLocation({
          lat: latLng.lat(),
          lng: latLng.lng(),
        });
        if (setLocationParent) {
          setLocationParent({
            lat: latLng.lat(),
            lng: latLng.lng(),
          });

          const position = {
            lat: latLng.lat(),
            lng: latLng.lng(),
          };
          setCenter(position);

          handlePin();

          // Remove old marker if it exists

          // Place new marker
          // const newMarker = new google.maps.Marker({
          //   position: latLng,
          //   map: gMap,
          // });

          // setMarker(newMarker);
        }
      });

      // Create Autocomplete searchbox instance with options (limit search of places & return fields (geometry = lat&lng))
      // Prepare Limit condition the place bound to thailand's area by southwest & northeast lat&lng
      const thailandBound = new google.maps.LatLngBounds(
        new google.maps.LatLng({ lat: 6.193508, lng: 97.403605 }),
        new google.maps.LatLng({ lat: 20.360655, lng: 105.478816 })
      );
      // Setup Autocomplete
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current,
        {
          bounds: thailandBound,
          fields: ["formatted_address", "geometry", "name"],
          componentRestrictions: {
            country: ["th"],
          },
        }
      );
      setAutoComplete(gAutoComplete);
      console.log("Setup autocomplete instance done");
    }
    console.log("end of useeffect");
  }, [isLoaded, center]);

  // ======== Setup the new marker for events when event array is updated ========//
  useEffect(() => {
    if (eventArray) {
      eventArray.forEach((event) => {
        let location = {
          lat: +event.location.split(",")[0],
          lng: +event.location.split(",")[1],
        };
        setMarkerForEvents(
          location,
          event.eventName,
          event.eventStartDate,
          event.eventId
        );
      });
    }
  }, [isLoaded, map, eventArray]);

  // ======== Event listener to listen to change in searchbox autoComplete to get the updated place and repin the location
  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        console.log("place", place); // ทำงานปกติ: จะได้ค่าตามที่เราระบุไว้ใน placesautocomplete(fields) คือ 'formatted_address','geometry', 'name'
        setSelectedPlace(place.formatted_address);
        const position = place.geometry?.location; // get lat,lng of the selected place
        if (position) {
          // Place a marker at the selected place location
          // setMarker(position, place.name, place.formatted_address);
          setCenter(position);
          // Set search keyword ให้เป็น lat,lng format เพื่อที่จะใช้ในการยิง API ไป get near me มาด้วย

          const latlng = position.lat() + "," + position.lng();
          console.log("Lat,long value for searchbox", latlng);
          setSearchKeyword(latlng);
          // ต้อง call api เพื่อที่จะถึง near me ใหม่มา โดยที่เอา lat long ของใหม่เป็นศก แล้วให้ไป trigger useEffect ที่แสดง pin ของ event near me
          console.log("Inside useeffect after confirm place in search box"); // run แล้ว หลังจาก confirm search
          console.log("Position data before modifying", position);
          // fetchEventNearMe(position); // run แล้วหลังจาก confirm search ด้วย lat/lng ใหม่
          console.log(
            "After call fetcheventnearme after change place in search box"
          );
          // fetchEventNearMe(center)
        }
      });
    }
  }, [autoComplete]);

  function setMarkerForEvents(
    location,
    name,
    locationAddressOrEventDetails,
    eventId
  ) {
    // Marker นี้ควรจะโชว์ เมื่อกดคลิก
    if (!map) return;
    // Render Marker
    const svgMarker = {
      path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "green",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(0, 20),
    };
    const newMarker = new google.maps.Marker({
      position: location,
      map: map,
      // icon: svgMarker,
    });

    // Setup content for
    const content = document.createElement("div");
    content.style.width = "100px";
    // content.style.minHeight = "50px";
    content.style.color = "#20831E";
    content.textContent = locationAddressOrEventDetails;

    // Render infoCard with onClose to close the item
    const infoCard = new google.maps.InfoWindow({
      position: location,
      headerContent: name,
      minWidth: 100,
      ariaLabel: "hello world hello world",
      content: content,
    });
    // Add click event listener to marker to open infoCard
    newMarker.addListener("click", (e) => {
      console.log("event from clicking marker", e);
      // setSelectedEventId(e.id);
      infoCard.open({
        map: map,
        anchor: newMarker,
      });
    });

    return newMarker;
  }

  return (
    <div className="flex flex-col relative">
      {/* Show search box */}
      <div
        className={`absolute ${small ? "top-16 left-3" : "top-16 left-3 xl:top-4 xl:left-56"} z-20`}
      >
        <input
          type="text"
          ref={placeAutoCompleteRef}
          className="bg-white text-black h-6 w-56 px-3 py-2 rounded-lg"
        />
      </div>
      {/* Show map */}
      {isLoaded ? (
        <div className="h-[64vh] xl:h-[60vh] 2xl:h-[67vh]" ref={mapRef}></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
