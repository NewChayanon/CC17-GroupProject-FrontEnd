import { useEffect, useState } from "react";
import userApi from "../../apis/user";
import EmptyState from "../../components/EmptyState";
import { CouponIcon } from "../../icons";
import EventsBySellerBox from "../interestevent/EventsBySellerBox";

export default function InterestedEvent() {
  const [interestedEventArr, setInerestedEventArr] = useState([]);
  const [updateInterestEventStatus, setUpdateInterestEventStatus] =
    useState(false);
  const fetchInterestedEvent = async () => {
    try {
      const result = await userApi.getInterestedEvent();
      console.log("result from API getting interested event", result);
      const preInterestedEventArr = result.data;
      // ค่า event ที่รับมา ก่อนที่จะ set state ให้ ยัด field "interest:true" เข้าไปให้กับแต่ละ event ที่รับเข้ามาก่อน เพราะทุกๆ event ที่ load มาจาก API แปลว่าเป็น interested event
      for (let event of preInterestedEventArr) {
        event.interest = true;
      }
      setInerestedEventArr(preInterestedEventArr);
    } catch (err) {
      console.log("error from getting interested event");
    }
  };
  // ให้ fetch data ใหม่ทุกครั้งที่ 1. เปิดหน้า user/interest เข้ามา 2. เมื่อมีการกด unpin interested event ในหน้านี้: monitor อะไรได้?
  useEffect(() => {
    fetchInterestedEvent();
    setUpdateInterestEventStatus(false);
  }, [updateInterestEventStatus]);

  // Handle event data by grouping by seller name
  const eventObjByStore = interestedEventArr.reduce((acc, eventObj) => {
    if (acc[eventObj.sellerFirstName]) {
      acc[eventObj.sellerFirstName].push(eventObj);
    } else {
      acc[eventObj.sellerFirstName] = [eventObj];
    }
    return acc;
  }, {});
  console.log("event object by storename", eventObjByStore);
  const finalEventArr = [];
  for (let key in eventObjByStore) {
    console.log(key, eventObjByStore[key]);
    finalEventArr.push({ [key]: eventObjByStore[key] });
  }
  console.log("finalEventArr", finalEventArr);

  return (
    <div>
      {finalEventArr[0] ? (
        <>
          {finalEventArr.map((eventsObjectBySeller, index) => (
            <EventsBySellerBox
              eventsObjectBySeller={eventsObjectBySeller}
              key={index}
              index={index}
              setUpdateInterestEventStatus={setUpdateInterestEventStatus}
            />
          ))}
        </>
      ) : (
        <EmptyState
          message="No interested event is found"
          icon={<CouponIcon isActive={false} />}
        />
      )}
    </div>
  );
}
