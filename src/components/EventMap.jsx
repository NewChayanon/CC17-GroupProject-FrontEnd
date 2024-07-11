"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback, Children } from "react";
const libraries = ["places", "core", "maps", "marker"];

export default function EventMap({ eventLocation }) {
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(16);
  const [center, setCenter] = useState(eventLocation);
  // เช็คว่า API load แล้วรึยัง
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });
  const mapRef = useRef(null);
  // Set center to be lat,lng of this location
  useEffect(() => {
    setCenter(eventLocation);
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      console.log("raw event location value", eventLocation);
      console.log("current location before instantiate the map", center);
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
      setMarker(center);
      console.log("Map instantiated done");
    }
    console.log("end of useeffect");
  }, [isLoaded, eventLocation, center]);

  function setMarker(location) {
    // Marker นี้ควรจะโชว์ เมื่อกดคลิกที่ pin เท่านั้น และสามารถปิดได้ด้วย
    if (!map) return;
    // Render Marker
    // map.setCenter(location); // set center ใหม่ให้กับ map ด้วยค่า new place ที่ search มา
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker",
    });
    // Setup content for
    // const content = document.createElement("div");
    // content.style.width = "100px";
    // // content.style.minHeight = "50px";
    // content.style.color = "#20831E";
    // content.textContent = locationAddressOrEventDetails;

    // // Render infoCard with onClose to close the item
    // const infoCard = new google.maps.InfoWindow({
    //   position: location,
    //   headerContent: name,
    //   minWidth: 100,
    //   ariaLabel: "hello world hello world",
    //   content: content,
    // });
    // // Add click event listener to marker to open infoCard
    // marker.addListener("click", (e) => {
    //   console.log("console log click marker event", e);
    //   infoCard.open({
    //     map: map,
    //     anchor: marker,
    //   });
    // });
  }

  return (
    <div>
      {isLoaded ? (
        <div className="h-[250px]" ref={mapRef}></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
