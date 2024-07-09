"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback, Children } from "react";
import authApi from "../../apis/auth";
import SearchBar from "../../components/SearchBar";
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
  const [searchKeyword, setSearchKeyword] = useState("");
  // เช็คว่า API load แล้วรึยัง
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  // reference to the map and place to show
  const mapRef = useRef(null);
  const placeAutoCompleteRef = useRef(null);
  // Event handler function to handle map change (zoomlevel, center)
  // const handleMapChange = useCallback(() => {
  //   console.log("map info inside handle change function", map);
  //   if (map) {
  //     // mapRef.current = map;
  //     console.log("Map Instance", map); // ค่านี้มาอยู่
  //     console.log("Map new zoom level", map.zoom);
  //     setZoomLevel(map.getZoom());
  //     console.log("map new center", map.getCenter().toJSON()); // ได้ค่า lat,lng เดิม
  //     setCenter(map.getCenter().toJSON());
  //   }
  // }, [map]);

  // Useeffect to detect change in currentlocation
  useEffect(() => {
    setCenter(currentLocation);
  }, [currentLocation]);
  // ========= first load map and show map ===========//
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      console.log("current location before instantiate the map", center);
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
      console.log("Map instantiated done");
      // // Add event listener function to the map
      // gMap.addListener("zoom_changed", handleMapChange);
      // gMap.addListener("dragend", handleMapChange);
      // gMap.addListener("idle", handleMapChange);

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
  }, [isLoaded, currentLocation, center]);

  // ======== Setup the new marker for events when event array is updated ========//
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
        setMarkerForEvents(
          location,
          event.eventName,
          event.eventStartDate,
          event.id
        );
      });
    }
  }, [isLoaded, eventArray]);

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
          setMarker(position, place.name, place.formatted_address);
          setCenter(position);
          // Set search keyword ให้เป็น lat,lng format เพื่อที่จะใช้ในการยิง API ไป get near me มาด้วย

          const latlng = position.lat() + "," + position.lng();
          console.log("Lat,long value for searchbox", latlng);
          setSearchKeyword(latlng);
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
  function setMarkerForEvents(
    location,
    name,
    locationAddressOrEventDetails,
    eventId
  ) {
    // Marker นี้ควรจะโชว์ เมื่อกดคลิกที่ pin เท่านั้น และสามารถปิดได้ด้วย
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
    // const marker = new google.maps.marker.AdvancedMarkerElement({
    //   map: map,
    //   position: location,
    //   title: "Marker Title",
    //   icon: svgMarker,
    // });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker Title",
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
      console.log("event from clicking marker", e);
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
    <div className="flex flex-col relative">
      {/* add searchbox */}
      <div className="absolute z-20 top-4">
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          eventArray={eventArray}
          setEventArray={setEventArray}
          placeAutoCompleteRef={placeAutoCompleteRef}
        />
      </div>
      {/* Show search box */}
      {/* <input
        type="text"
        ref={placeAutoCompleteRef}
        className="bg-white text-black h-6 w-80"
      /> */}
      {/* Show map */}
      {isLoaded ? (
        <div className="h-[300px]" ref={mapRef}></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
