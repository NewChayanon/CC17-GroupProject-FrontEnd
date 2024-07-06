"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback, Children } from "react";
const libraries = ["places", "core", "maps", "marker"];
const buildMapInfoCardContent = (title, body) => {
  return (
    <div className="w-[100px] h-[40px]">
      <div className="font-bold text-xl">${title}</div>
      <div className="font-semibold text-base">${body}</div>
    </div>
  );
};

export default function Map({
  currentLocation,
  setCurrentLocation,
  eventArray,
  setEventArray,
}) {
  // set a state for a map created
  const [map, setMap] = useState(null);
  // set a state for autocomplete
  const [autoComplete, setAutoComplete] = useState(null);
  // เช็คว่า API load แล้วรึยัง
  const [zoomLevel, setZoomLevel] = useState(12);
  const [center, setCenter] = useState(currentLocation);
  const [bounds, setBounds] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  // reference to the map and place to show
  const mapRef = useRef(null);
  const placeAutoCompleteRef = useRef(null);
  // State for the selected place from autocomplete
  const [selectedPlace, setSelectedPlace] = useState(null);
  const handleMapChange = useCallback(() => {
    console.log("map info inside handle change function", map);
    if (!map) return;
    // mapRef.current = map;
    console.log("Map instance", map); // ค่านี้มาอยู่
    console.log("Map new zoom level", map.zoom);
    // console.log("Map Details", map.detail); // ตรงนี้ระเบิด เพราะไม่มีค่า
    // console.log("Map bounds", map.detail.bounds);
    //   setZoomLevel(map.detail.zoom); // set new zoom level
    //   setCenter(map.detail.center); // set center of the map with center
    //   setBounds(map.detail.bounds); // set new bound
    setZoomLevel(map.zoom);
    console.log("map new center", map.getCenter().toJSON());
    setCenter(map.getCenter().toJSON());
    // console.log("Current Zoom Level:", zoomLevel);
    // console.log("Current Center:", center);
    // Use the idle event listener to update zoom and center state
    //   map.addListener("idle", updateState);
    //   map.addListener("dragend", updateState);
    //   map.addListener("mouseover", updateState);
    // Initial call to set state
    // updateState();
  }, [map]);

  // load map show map
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapOptions = {
        // center: {
        //   lat: latlong.coordinates[0],
        //   lng: latlong.coordinates[1],
        // },
        center: currentLocation,
        zoom: 17,
        mapId: import.meta.env.VITE_GOOGLE_MAP_MAP_ID,
        // mapId: "MY-MAP-1234",
        // onIdle: { handleMapChange },
        // onCenterChanged: { handleMapChange },
        // onZoomChanged: { handleMapChange },
      };
      // Setup a map
      const gMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap((prev) => gMap);
      // Add event listener function to the map
      gMap.addListener("zoom_changed", handleMapChange);
      gMap.addListener("dragend", handleMapChange);
      gMap.addListener("idle", handleMapChange);

      // Limit the place bound to thailand's area by southwest & northeast lat&lng
      const thailandBound = new google.maps.LatLngBounds(
        new google.maps.LatLng({ lat: 6.193508, lng: 97.403605 }),
        new google.maps.LatLng({ lat: 20.360655, lng: 105.478816 })
      );

      // Setup Autocomplete with options (limit search of places & return fields (geometry = lat&lng))
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
    }
  }, [isLoaded]);
  // listen to change in autoComplete to get the updated place and repin the location
  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        console.log("place", place); // จะได้ค่าตามที่เราระบุไว้ใน placesautocomplete(fields) คือ 'formatted_address','geometry', 'name'
        setSelectedPlace(place.formatted_address);
        const position = place.geometry?.location; // get lat,lng of the selected place
        if (position) {
          // Place a marker at the selected place location
          setMarker(position, place.name);
          setAutoComplete(null);
        }
      });
    }
  }, [autoComplete]);
  // Create function to set market to the selected place (โดยการระบุ lat lng)
  function setMarker(location, name) {
    if (!map) return;
    map.setCenter(location);
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker",
    });
    const infoCard = new google.maps.InfoWindow({
      position: location,
      content: buildMapInfoCardContent(name, name),
      maxWidth: 200,
    });
    infoCard.open({ map: map, anchor: marker });
  }
  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        ref={placeAutoCompleteRef}
        className="bg-white text-black"
      />
      {isLoaded ? (
        <div className="h-[600px]" ref={mapRef}></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
