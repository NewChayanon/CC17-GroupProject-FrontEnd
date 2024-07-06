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
}) {
  // set a state for a map created
  console.log("eventArray", eventArray);
  const [map, setMap] = useState(null);
  // set a state for autocomplete
  const [autoComplete, setAutoComplete] = useState(null);
  // State for the selected place from autocomplete
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12);
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

  useEffect(() => {
    if (eventArray) {
      eventArray.forEach((event) => {
        let location = {
          lat: +event.eventLocation.split(",")[0],
          lng: +event.eventLocation.split(",")[1],
        };
        setMarker(location, event.eventName, event.eventStartDate);
      });
    }
  }, [isLoaded, eventArray]);

  // listen to change in searchbox autoComplete to get the updated place and repin the location
  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        console.log("place", place); // จะได้ค่าตามที่เราระบุไว้ใน placesautocomplete(fields) คือ 'formatted_address','geometry', 'name'
        setSelectedPlace(place.formatted_address);
        const position = place.geometry?.location; // get lat,lng of the selected place
        if (position) {
          // Place a marker at the selected place location
          setMarker(position, place.name, place.formatted_address);
          setCenter((prev) => position);
          // ต้อง call api เพื่อที่จะถึง near me ใหม่มา โดยที่เอา lat long ของใหม่เป็นศก แล้วให้ไป trigger useEffect ที่แสดง pin ของ event near me
          fetchEventNearMe(center);
        }
      });
    }
  }, [autoComplete]);

  const fetchEventNearMe = async (center) => {
    try {
      const body = {};
      body.userLocation = center.lat + "," + center.lng;
      console.log("body", body);
      const result = await authApi.getNearMe(body);
      console.log("result from get nearMe after change new center", result);
      setEventArray(result.data);
    } catch (err) {
      console.log("error from fetching event near me API", err);
    }
  };
  // Create function to set market to the selected place (โดยการระบุ lat lng)
  function setMarker(location, name, address) {
    if (!map) return;
    map.setCenter(location);

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker",
    });
    // Setup content for
    const content = document.createElement("div");
    content.style.width = "100px";
    content.style.height = "100px";
    content.style.color = "#007bff";
    content.textContent = address;

    const infoCard = new google.maps.InfoWindow({
      position: location,
      headerContent: name,
      minWidth: 100,
      ariaLabel: "hello world hello world",
      content: content,
    });
    infoCard.open({ map: map, anchor: marker });
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
