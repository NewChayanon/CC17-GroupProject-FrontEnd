// export default function getCurrentLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         console.log("current Position", pos);
//         return pos;
//       },
//       () => {
//         console.log("Error");
//       }
//     );
//   } else {
//     console.log("No location allowed");
//     return;
//   }
// }
export default function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("current Position", pos);
          resolve(pos);
        },
        (error) => {
          console.log("Error", error);
          reject(error);
        }
      );
    } else {
      console.log("No location allowed");
      reject(new Error("Geolocation not supported"));
    }
  });
}
