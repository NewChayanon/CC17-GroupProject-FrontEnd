export default async function findPlaces(
  searchText,
  currentLocation = { lat: 37.4161493, lng: -122.0812166 }
) {
  const { Place } = await google.maps.importLibrary("places");
  //   const { AdvancedMarketElement } = await google.maps.importLibrary("marker");

  const request = {
    textQuery: searchText,
    fields: ["displayName", "location", "businessStatus"],
    includedType: "restaurant",
    locationBias: currentLocation,
    isOpenNow: true,
    language: "en-US",
    maxResultCount: 8,
    minRating: 3.2,
    region: "us",
    useStrictTypeFiltering: false,
  };
  const { places } = await Place.searchByText(request);
  console.log("All Places", places);
}
