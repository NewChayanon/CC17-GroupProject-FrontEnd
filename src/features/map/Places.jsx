import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
// import "@react/combobox/style.css";
const libraries = ["places"];

export default function Places() {
  // Load google map script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });
  if (!isLoaded) return <div>Loading... </div>;
  return <Map />;
}
function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -88.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="w-100 h-100">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap zoom={10} center={center} mapContainerClassName="w-100 h-100">
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handleSelect = async (address) => {
    // convert selected place into lat&long
    // value จะเป็น string that represents the full address of what user has chosen
    setValue(address, false); //false = no need to fetch additional data
    clearSuggestions(); // clear popup ที่ขึ้นมา suggest ให้ user ทั้งหมด
    const results = await getGeocode({ address }); // get geocode
    console.log("result from geocode", results);
    const { lat, lng } = await getLatLng(results[0]); //convert geocode into lat,lng
    setSelected({ lat, lng }); // มันจะไป update ค่า location ที่เราเลือก เพื่อแสดง marker ขึ้นมา >> ตรงนี้เราเอาไปใช้ customize การโชว์ marker ได้
    console.log("latitude and longtitude", lat, lng);
  };
  return (
    <Combobox onSlect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="text-white"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
