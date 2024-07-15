import { useLocation } from "react-router-dom";
import RightSideBarMainPage from "./components/RightSideBarMainPage";
import RightSideBarProfile from "./components/RightSideBarProfile";
import RightSideBarFollower from "./components/RightSideBarFollower";

const RightSidebar = () => {
  const location = useLocation();
  return (
    <div className="hidden xl:flex flex-col w-1/4 min-w-[370px] bg-white overflow-y-auto">
      {location.pathname.includes("profile") ? (
        // <RightSideBarProfile />
        <RightSideBarMainPage />
      ) : location.pathname.includes("followers") ? (
        <RightSideBarFollower />
      ) : (
        <RightSideBarMainPage />
      )}
    </div>
  );
};

export default RightSidebar;
