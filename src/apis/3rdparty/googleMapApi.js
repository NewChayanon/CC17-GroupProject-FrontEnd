// import axios from "axios";

// googleMapApi = {};
// googleMapApi.locationSearch = (data) => axios.post("", data);

// export default googleMapApi;

async function searchPlaces() {
  //   const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY
  const url = "https://places.googleapis.com/v1/places:searchText";
  const data = {
    textQuery: "Spicy Vegetarian Food in Sydney, Australia",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.priceLevel",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default searchPlaces;
