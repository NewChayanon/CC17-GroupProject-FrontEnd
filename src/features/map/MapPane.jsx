"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useCallback, useRef, useState } from "react";

export default function MapPane({
  eventArray,
  setEventArray,
  currentLocation,
  setCurrentLocation,
}) {
  const [openInfoWindows, setOpenInfoWindows] = useState({});
  console.log("eventArray", eventArray);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [center, setCenter] = useState(currentLocation);
  const [bounds, setBounds] = useState(null); // structure : {south:xxx,west:xxx,north:xxx,east:xxx}
  // const mapRef = useRef(null);

  // const handleMapLoad = (map) => {
  //   mapRef.current = map;
  //   //Add event listener
  //   // Add event listeners
  //   map.addListener("zoom_changed", () => {
  //     setZoomLevel(map.getZoom());
  //   });

  //   map.addListener("center_changed", () => {
  //     const newCenter = map.getCenter();
  //     setCenter({
  //       lat: newCenter.lat(),
  //       lng: newCenter.lng(),
  //     });
  //   });
  // };

  const handleMapChange = useCallback((map) => {
    // mapRef.current = map;
    console.log("Map instance", map);
    console.log("Map Details", map.detail);
    console.log("Map bounds", map.detail.bounds);

    const updateState = () => {
      setZoomLevel(map.detail.zoom); // set new zoom level
      setCenter(map.detail.center); // set center of the map with center
      setBounds(map.detail.bounds); // set new bound
    };
    // Use the idle event listener to update zoom and center state
    // map.addListener("idle", updateState);
    // map.addListener("dragend", updateState);
    // map.addListener("mouseover", updateState);
    // Initial call to set state
    updateState();
  }, []);
  console.log("Current Zoom Level:", zoomLevel);
  console.log("Current Center:", center);

  const handleMarkerClick = (key) => {
    setOpenInfoWindows((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the state for the clicked marker
    }));
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <div className="w-full h-[286px]">
        <Map
          defaultZoom={12}
          defaultCenter={currentLocation}
          mapId={import.meta.env.VITE_GOOGLE_MAP_MAP_ID}
          onIdle={handleMapChange}
          // onCenterChanged={handleMapChange}
          // onZoomChanged={handleMapChange}
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

    // <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
    //   <div style={{ height: "286px", width: "430px" }}>
    //     <Map
    //       defaultZoom={12}
    //       defaultCenter={currentLocation}
    //       mapId={import.meta.env.VITE_GOOGLE_MAP_MAP_ID}
    //     >
    //       {/*Render Current Location */}
    //       <AdvancedMarker position={currentLocation}>
    //         <Pin
    //           background={"red"}
    //           borderColor={"yellow"}
    //           glyphColor={"yellow"}
    //         ></Pin>
    //       </AdvancedMarker>
    //       {/* Render Event List*/}
    //       {eventArray.map((event) => (
    //         <AdvancedMarker
    //           position={event.position}
    //           key={event.key}
    //           onClick={() => handleMarkerClick(event.key)}
    //         >
    //           <Pin
    //             background={"green"}
    //             borderColor={"yellow"}
    //             glyphColor={"yellow"}
    //           ></Pin>
    //           {openInfoWindows[event.key] && (
    //             <InfoWindow
    //               position={event.position}
    //               onCloseClick={() => handleMarkerClick(event.key)}
    //             >
    //               <p>{event.eventDetails}</p>
    //             </InfoWindow>
    //           )}
    //         </AdvancedMarker>
    //       ))}
    //     </Map>
    //   </div>
    // </APIProvider>
  );
}
