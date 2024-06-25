"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function MapPane({
  eventArray,
  setEventArray,
  currentLocation,
  setCurrentLocation,
}) {
  const [openInfoWindows, setOpenInfoWindows] = useState({});

  console.log("eventArray", eventArray);

  const handleMarkerClick = (key) => {
    setOpenInfoWindows((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the state for the clicked marker
    }));
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <div style={{ height: "286px", width: "430px" }}>
        <Map
          defaultZoom={12}
          defaultCenter={currentLocation}
          mapId={import.meta.env.VITE_GOOGLE_MAP_MAP_ID}
        >
          {/*Render Current Location */}
          <AdvancedMarker position={currentLocation}>
            <Pin
              background={"red"}
              borderColor={"yellow"}
              glyphColor={"yellow"}
            ></Pin>
          </AdvancedMarker>
          {/* Render Event List*/}
          {eventArray.map((event) => (
            <AdvancedMarker
              position={event.position}
              key={event.key}
              onClick={() => handleMarkerClick(event.key)}
            >
              <Pin
                background={"green"}
                borderColor={"yellow"}
                glyphColor={"yellow"}
              ></Pin>
              {openInfoWindows[event.key] && (
                <InfoWindow
                  position={event.position}
                  onCloseClick={() => handleMarkerClick(event.key)}
                >
                  <p>{event.eventDetails}</p>
                </InfoWindow>
              )}
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
