import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../../zustand/store";

export default function StoreDetail() {
  // get store ID and get store data from API
  const { pathname } = useLocation();
  // Call API to get all store details - async await & keep data in state
  const setStoreId = useStore((state) => state.setStoreId);
  const storeId = useStore((state) => state.storeId);
  const isAuthenticated = useStore((state)=>state.isAuthenticated)
  const isLoading = useStore((state)=>state.isLoading)
  const storeIdfromPath = pathname.split("/")[2];
  
  console.log("store ID from path", storeIdfromPath);
const selectedStoreDetails = useStore((state)=>state.selectedStoreDetails)
const setSelectedStoreDetails = useStore((state)=> state.setSelectedStoreDetails)
  useEffect(() => {
    setSelectedStoreDetails(storeIdfromPath,isAuthenticated);
    setStoreId(storeIdfromPath)
  }, []);

  return (
    <div className="m-6 p-4 border border-graylighttext rounded-xl">
      <div>
        <div className="text-lg font-bold text-graydarktext">
          About the seller
        </div>
        <div className="text-base text-primary">{selectedStoreDetails?.sellerDescription || "About Seller"}</div>
      </div>
      <div>
        <div className="text-lg font-bold text-graydarktext">
         About {selectedStoreDetails?.storeName || "Lovelove Durian"}
        </div>
        <div className="text-base text-primary">{selectedStoreDetails?.storeDescription || "About Store"}</div>
      </div>
    </div>
  );
}
