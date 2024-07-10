import { useEffect, useState } from "react";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export default function EventLocationPhoto({ latitude, longitude }) {
  const [placeName, setPlaceName] = useState("");
  const [photos, setPhotos] = useState([]);

  // Function to get place ID from coordinates
  const getPlaceIdFromCoordinates = async () => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=${GOOGLE_MAPS_API_KEY}`
    );
    // const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyBXteMA_9ErSHObWYTNf9bcY-09H_Djir4`
    // );

    console.log("response from google api", response);
  };
  getPlaceIdFromCoordinates(1, 1);

  return (
    <div>
      {/* <h1>Place Name: {placeName}</h1> */}
      <div>
        HelloWorld
        {/* {photos.map((photo, index) => (
          <img
            key={index}
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`}
            alt="Place"
          />
        ))} */}
      </div>
    </div>
  );
}
