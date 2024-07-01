import {
  FacebookIconForStoreEvent,
  InstagramIconForStoreEvent,
  LineIconForStoreEvent,
} from "../../icons";
import EventSideBarCard from "./components/EventSideBarCard";

const RightSidebar = () => {
  // FOR TEMPORARY USAGE WAIT FOR API
  const socialNetworkIcon = {
    facebook: true,
    instagram: false,
    line: false,
  };
  // FOR TEMPORARY USAGE WAIT FOR API

  return (
    <div className="hidden xl:flex flex-col w-1/4 min-w-[370px] bg-white overflow-y-auto">
      <div className="w-full h-52">
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          src="https://picsum.photos/400"
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
            src="https://picsum.photos/seed/picsum/400/200"
            alt="personal photo"
          />
          <div className="w-full px-2 py-0.5">
            <p className="text-sm text-ellipsis overflow-hidden font-medium text-graydarktext">
              TEST EVENLONGERNAME
            </p>
          </div>
        </div>
        <div className="flex p-2 justify-between items-start">
          <div className="w-3/5 overflow-hidden h-8">
            <p className="text-lg text-ellipsis overflow-hidden font-medium text-darkgreen">
              StoreNameadawdawdwd EVENfweffasdad LONGERRRRRRdwadwd REEEEEEEEE
            </p>
          </div>
          <div className="flex gap-1 pt-1">
            <FacebookIconForStoreEvent isActive={socialNetworkIcon.facebook} />
            <InstagramIconForStoreEvent
              isActive={socialNetworkIcon.instagram}
            />
            <LineIconForStoreEvent isActive={socialNetworkIcon.line} />
          </div>
        </div>
        <div className="px-2 text-xs font-medium text-graydarktext">
          <p>999 followers</p>
          <p>999 events</p>
          <p>999 vouchers</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 p-4">
        <div>
          <p className="text-sm font-bold text-vividgreen">
            Event happening now
          </p>
        </div>
        <EventSideBarCard />
        <div>
          <p className="text-sm font-bold text-vividgreen">Upcoming events</p>
        </div>
        <EventSideBarCard />
        <EventSideBarCard />
      </div>
    </div>
  );
};

export default RightSidebar;
