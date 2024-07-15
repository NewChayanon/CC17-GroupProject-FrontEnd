import {
  FacebookIconForStoreEvent,
  InstagramIconForStoreEvent,
  LineIconForStoreEvent,
} from "../../../icons";
import EventSideBarCard from "./EventSideBarCard";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import useStore from "../../../zustand/store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RightSideBarMainPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const storeDetail = useStore((state) => state.storeDetail);
  const getMyStore = useStore((state) => state.getMyStore);
  const getCreatedEvents = useStore((state) => state.getCreatedEvents);
  const { myEvent, myStoreProfile } = storeDetail;
  const formatMonth = useStore((state) => state.formatMonth);
  const formatDate = useStore((state) => state.formatDate);
  const convertTime = useStore((state) => state.convertTime);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const setSlideUp = useStore((state) => state.setSlideUp);
  const setShowText = useStore((state) => state.setShowText);
  const setRedirectEdit = useStore((state) => state.setRedirectEdit);
  const deleteEvent = useStore((state) => state.deleteEvent);

  const handleEditEvent = (e) => {
    setSelectedEvent(e);
    setRedirectEdit(true);
    setSlideUp(true);
    setShowText(true);
    navigate("/mystore");
  };

  const handleDeleteEvent = async (e) => {
    try {
      await deleteEvent(e.eventId);
      const res = await getMyStore();
      if (pathname.includes("mystore/created-events")) {
        await getCreatedEvents();
      } else if (pathname.includes("mystore")) {
        if (res.myStoreProfile.eventNow.length > 0) {
          setSelectedEvent(res.myStoreProfile.eventNow[0]);
        } else if (res.myStoreProfile.upComingEvent.length > 0) {
          setSelectedEvent(res.myStoreProfile.eventNow[0]);
        } else return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMyStore();
    };
    fetchData();
  }, []);

  return (
    <>
      {myStoreProfile && (
        <div>
          <div className="w-full h-52">
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              src={myStoreProfile.storeProfileImage}
              alt="store cover image"
            />
          </div>
          <div className="relative pl-32 flex flex-col">
            <div className="absolute w-32 flex flex-col items-center left-0 -top-10 text-center">
              <img
                className="shadow-lg shadow-graylighticon"
                style={{
                  height: "96px",
                  width: "96px",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "50%",
                }}
                src={myStoreProfile.userCoverImage}
                alt="personal photo"
              />
              <div className="w-full px-2 py-0.5">
                <p className="text-sm text-ellipsis overflow-hidden font-medium text-graydarktext">
                  {myStoreProfile.firstName} {myStoreProfile.lastName}
                </p>
              </div>
            </div>
            <div className="flex p-2 justify-between items-start">
              <div className="w-3/5 overflow-hidden h-8">
                <p className="text-lg text-ellipsis overflow-hidden font-medium text-darkgreen">
                  {myStoreProfile.storeName}
                </p>
              </div>
              <div className="flex gap-1 pt-1">
                <a href={myStoreProfile.facebook} target="_blank">
                  <FacebookIconForStoreEvent
                    isActive={myStoreProfile.facebook}
                  />
                </a>
                <a href={myStoreProfile.instagram} target="_blank">
                  <InstagramIconForStoreEvent
                    isActive={myStoreProfile.instagram}
                  />
                </a>
                <a href={myStoreProfile.line} target="_blank">
                  <LineIconForStoreEvent isActive={myStoreProfile.line} />
                </a>
              </div>
            </div>
            <div className="px-2 text-xs font-medium text-graydarktext">
              <p>{storeDetail.myStoreProfile.followers} followers</p>
              <p>{storeDetail.myStoreProfile.events} events</p>
              <p>{storeDetail.myStoreProfile.vouchers} vouchers</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 p-4">
            <div>
              <p className="text-sm font-bold text-vividgreen">
                Event happening now
              </p>
            </div>
            {myStoreProfile.eventNow.length > 0 ? (
              myStoreProfile.eventNow.map((e) => (
                <EventSideBarCard
                  key={e.eventId}
                  startDate={new Date(e.startDate).getUTCDate()}
                  startMonth={formatMonth(e.startDate)}
                  endDate={formatDate(e.endDate)}
                  openTime={convertTime(
                    e.openTime.split("T")[1].split(":00.000Z")[0]
                  )}
                  closingTime={convertTime(
                    e.closingTime.split("T")[1].split(":00.000Z")[0]
                  )}
                  location={e.locationName}
                  onClick={() => setSelectedEvent(e)}
                  onClickEdit={() => handleEditEvent(e)}
                  onClickDelete={() => handleDeleteEvent(e)}
                />
              ))
            ) : (
              <p className="text-sm font-medium text-graylighttext">
                No event happening now
              </p>
            )}
            <div>
              <p className="text-sm font-bold text-vividgreen">
                Upcoming events
              </p>
            </div>
            {myStoreProfile.upComingEvent.length > 0 ? (
              myStoreProfile.upComingEvent.map((e) => (
                <EventSideBarCard
                  key={e.eventId}
                  startDate={new Date(e.startDate).getUTCDate()}
                  startMonth={formatMonth(e.startDate)}
                  endDate={formatDate(e.endDate)}
                  openTime={convertTime(
                    e.openTime.split("T")[1].split(":00.000Z")[0]
                  )}
                  closingTime={convertTime(
                    e.closingTime.split("T")[1].split(":00.000Z")[0]
                  )}
                  location={e.locationName}
                  onClick={() => setSelectedEvent(e)}
                  onClickEdit={() => handleEditEvent(e)}
                  onClickDelete={() => handleDeleteEvent(e)}
                />
              ))
            ) : (
              <p className="text-sm font-medium text-graylighttext">
                No upcoming event
              </p>
            )}
            <div className="flex pt-2 justify-end">
              <Button onClick={() => navigate("created-events")} width="large">
                <p className="font-bold">Create new event</p>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSideBarMainPage;
