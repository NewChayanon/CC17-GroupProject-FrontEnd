"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback, Children } from "react";
import authApi from "../../apis/auth";
const libraries = ["places", "core", "maps", "marker"];

export default function Map({
  currentLocation,
  setCurrentLocation,
  eventArray,
  setEventArray,
  setSelectedEventId,
}) {
  // set a state for a map created
  console.log("EventArray at the start of MainMap component", eventArray);
  const [map, setMap] = useState(null);
  // set a state for autocomplete
  const [autoComplete, setAutoComplete] = useState(null);
  // State for the selected place from autocomplete to use to locate the new pin
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [center, setCenter] = useState(currentLocation);
  const [bounds, setBounds] = useState(null);
  // เช็คว่า API load แล้วรึยัง
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  // reference to the map and place to show
  const mapRef = useRef(null);
  const placeAutoCompleteRef = useRef(null);
  // Event handler function to handle map change (zoomlevel, center)
  const handleMapChange = useCallback(() => {
    console.log("map info inside handle change function", map);
    if (map) {
      // mapRef.current = map;
      console.log("Map Instance", map); // ค่านี้มาอยู่
      console.log("Map new zoom level", map.zoom);
      setZoomLevel(map.getZoom());
      console.log("map new center", map.getCenter().toJSON()); // ได้ค่า lat,lng เดิม
      setCenter(map.getCenter().toJSON());
    }
  }, [map]);

  // first load map and show map
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapOptions = {
        center: center,
        zoom: zoomLevel,
        minZoom: 10,
        maxZoom: 18,
        mapId: import.meta.env.VITE_GOOGLE_MAP_MAP_ID,
        // mapId: "MY-MAP-1234",
      };
      // Create a map instance
      const gMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(gMap);
      // Add event listener function to the map
      gMap.addListener("zoom_changed", handleMapChange);
      gMap.addListener("dragend", handleMapChange);
      gMap.addListener("idle", handleMapChange);

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
  }, [isLoaded, currentLocation]);

  // Setup the new marker for events when event array is updated
  useEffect(() => {
    console.log(
      "Use effect to set marker for events near me after search new place" // ตรงนี้รันอยู่ เวลา search new place
    );
    if (eventArray) {
      eventArray.forEach((event) => {
        let location = {
          lat: +event.eventLocation.split(",")[0],
          lng: +event.eventLocation.split(",")[1],
        };
        setMarkerForEvents(location, event.eventName, event.eventStartDate);
      });
    }
  }, [isLoaded, eventArray]);

  // Event listener to listen to change in searchbox autoComplete to get the updated place and repin the location
  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        console.log("place", place); // ทำงานปกติ: จะได้ค่าตามที่เราระบุไว้ใน placesautocomplete(fields) คือ 'formatted_address','geometry', 'name'
        setSelectedPlace(place.formatted_address);
        const position = place.geometry?.location; // get lat,lng of the selected place
        if (position) {
          // Place a marker at the selected place location
          setMarker(position, place.name, place.formatted_address);
          setCenter(position);
          // ต้อง call api เพื่อที่จะถึง near me ใหม่มา โดยที่เอา lat long ของใหม่เป็นศก แล้วให้ไป trigger useEffect ที่แสดง pin ของ event near me
          console.log("Inside useeffect after confirm place in search box"); // run แล้ว หลังจาก confirm search
          console.log("Position data before modifying", position);
          fetchEventNearMe(position); // run แล้วหลังจาก confirm search ด้วย lat/lng ใหม่
          console.log(
            "After call fetcheventnearme after change place in search box"
          );
          // fetchEventNearMe(center)
        }
      });
    }
  }, [autoComplete]);

  const fetchEventNearMe = async (position) => {
    try {
      const params = {};
      params.userLocation = position.lat() + "," + position.lng();
      console.log("Params", params); // params ถูกแล้ว {userLocation: '7.8836389,98.38796599999999'}
      const result = await authApi.getNearMe(params); // ตรงนี้รันแล้ว หลังจากที่ search box is confirmed
      console.log(
        "result from get nearMe after change new cente (inside component)r",
        result
      );
      setEventArray(result.data);
    } catch (err) {
      console.log("error from fetching event near me API", err);
    }
  };
  // Has 2 setmarker functions 1) For searched place 2) For events near me
  // Create function to set market to the selected place (โดยการระบุ lat lng)
  function setMarker(location, name, locationAddressOrEventDetails) {
    // Marker นี้ควรจะโชว์ เมื่อกดคลิกที่ pin เท่านั้น และสามารถปิดได้ด้วย
    if (!map) return;
    // Render Marker
    map.setCenter(location); // set center ใหม่ให้กับ map ด้วยค่า new place ที่ search มา
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker",
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
    marker.addListener("click", (e) => {
      console.log("console log click marker event", e);
      // setSelectedEventId(e.id);
      infoCard.open({
        map: map,
        anchor: marker,
      });
    });

    // Optional: Close the infoCard when clicking anywhere on the map (outside the marker)
    // map.addListener("click", () => {
    //   infoCard.close();
    // });
    // infoCard.open({ map: map, anchor: marker });
  }
  function setMarkerForEvents(location, name, locationAddressOrEventDetails) {
    // Marker นี้ควรจะโชว์ เมื่อกดคลิกที่ pin เท่านั้น และสามารถปิดได้ด้วย
    if (!map) return;
    // Render Marker
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker",
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
    marker.addListener("click", (e) => {
      console.log("console log click marker event", e);
      // setSelectedEventId(e.id);
      infoCard.open({
        map: map,
        anchor: marker,
      });
    });

    // Optional: Close the infoCard when clicking anywhere on the map (outside the marker)
    // map.addListener("click", () => {
    //   infoCard.close();
    // });
    // infoCard.open({ map: map, anchor: marker });
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Show search box */}
      <input
        // type="text"
        ref={placeAutoCompleteRef}
        className="bg-white text-black h-6 w-80"
      />
      {/* Show map */}
      {isLoaded ? (
        <div className="h-[286px]" ref={mapRef}></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
