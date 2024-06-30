import { useLocation } from "react-router-dom";

export default function StoreDetail() {
  // get store ID and get store data from API
  const { pathname } = useLocation();
  // Call API to get all store details - async await & keep data in state
  // const setEventId = useStore((state) => state.setEventId);
  // const eventId = useStore((state) => state.eventId);
  const storeIdfromPath = pathname.split("/")[2];
  console.log("store ID from path", storeIdfromPath);
  // setEventId(eventIdfromPath);

  // const selectedEventDetails = useStore((state) => state.selectedEventDetails); // ข้อมูลมา
  // const setSelectedEventDetails = useStore(
  //   (state) => state.setSelectedEventDetails
  // );
  // useEffect(() => {
  //   setSelectedEventDetails(eventId);
  // }, []);

  return (
    <div className="m-6 p-4 border border-graylighttext rounded-xl">
      <div>
        <div className="text-lg font-bold text-graydarktext">
          About the seller
        </div>
        <div className="text-base text-primary">About the seller</div>
      </div>
      <div>
        <div className="text-lg font-bold text-graydarktext">
          About Lovelove Durian
        </div>
        <div className="text-base text-primary">About the seller</div>
      </div>
    </div>
  );
}
