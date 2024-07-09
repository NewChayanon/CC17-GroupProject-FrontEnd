import { useEffect, useState } from "react";
import userApi from "../../apis/user";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import CouponTab from "../event/CouponTab";

export default function CollectedCoupons() {
  const [collectedCouponArr, setCollectedCouponArr] = useState([]);
  const [filteredCouponArr, setFilteredCouponArr] = useState([]);
  const [isCouponCollected, setIsCouponCollected] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const fetchCollectedCoupon = async () => {
    try {
      const result = await userApi.getCollectedCoupon();
      console.log("result from API getting collected coupons", result);
      // Sort Coupon by event start date and use status
      const sortedCollectedCouponArray = result.data.sort((a, b) => {
        // Convert eventEndDate from "DD/MM/YYYY" to Date object for comparison
        const dateA = new Date(a.eventEndDate.split("/").reverse().join("-"));
        const dateB = new Date(b.eventEndDate.split("/").reverse().join("-"));

        // Sort by eventEndDate from latest to oldest
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;

        // If eventEndDate is the same, sort by userVoucherStatus
        if (
          a.userVoucherStatus === "COLLECTED" &&
          b.userVoucherStatus !== "COLLECTED"
        )
          return -1;
        if (
          a.userVoucherStatus !== "COLLECTED" &&
          b.userVoucherStatus === "COLLECTED"
        )
          return 1;

        // If both are the same, keep the original order
        return 0;
      });
      // Set state
      setCollectedCouponArr(sortedCollectedCouponArray);
      setFilteredCouponArr(sortedCollectedCouponArray);
    } catch (err) {
      console.log("error from getting collected coupons", err);
    }
  };

  useEffect(() => {
    setIsCouponCollected(false);
    fetchCollectedCoupon();
  }, [isCouponCollected]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = [];
      collectedCouponArr.forEach((coupon) => {
        if (
          coupon.eventName
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          coupon.storeName
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
        ) {
          filtered.push(coupon);
        }
      });
      setFilteredCouponArr(filtered);
    } else {
      setFilteredCouponArr(collectedCouponArr);
    }
  }, [debouncedSearchQuery, collectedCouponArr]);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className=" bg-white p-4 flex flex-col gap-4">
      <SearchBarAdminPage
        placeholder="Search coupon by event or store name"
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <div className="flex flex-col p-4 gap-4">
        {filteredCouponArr.map((coupon, index) => (
          <CouponTab
            key={index}
            selectedEventDetails={coupon}
            useEnabled={true}
            setIsCouponCollected={setIsCouponCollected}
          />
        ))}
      </div>
    </div>
  );
}
