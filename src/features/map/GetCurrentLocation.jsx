export default function GetCurrentLocation() {
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("current Position", pos);
          return pos;
        },
        () => {
          console.log("Error");
        }
      );
    } else {
      console.log("No location allowed");
    }
  };
  getCurrentLocation();
  return <div>GetCurrentLocation</div>;
}
s;
