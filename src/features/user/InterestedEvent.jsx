import { useEffect, useState } from "react";
import userApi from "../../apis/user";
import EventTabCard from "../../components/EventTabCard";
import EventsBySellerBox from "../interestevent/EventsBySellerBox";

export default function InterestedEvent() {
  const [interestedEventArr, setInerestedEventArr] = useState([]);
  const fetchInterestedEvent = async () => {
    try {
      const result = await userApi.getInterestedEvent();
      console.log("result from API getting interested event", result);
      setInerestedEventArr(result.data);
    } catch (err) {
      console.log("error from getting interested event");
    }
  };
  useEffect(() => {
    fetchInterestedEvent();
  }, []);

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
      {finalEventArr.map((eventsObjectBySeller, index) => (
        <EventsBySellerBox
          eventsObjectBySeller={eventsObjectBySeller}
          key={index}
          index={index}
        />
      ))}
    </div>
  );
}
