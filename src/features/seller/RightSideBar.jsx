import { useLocation } from "react-router-dom";
import RightSidebarMainPage from "./components/RightSIdeBarMainPage";
import RightSideBarProfile from "./components/RightSideBarProfile";

const RightSidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="hidden xl:flex flex-col w-1/4 min-w-[370px] bg-white overflow-y-auto">
      {location.pathname.includes("profile") ? (
        <RightSideBarProfile />
      ) : (
        <RightSidebarMainPage />
      )}
    </div>
  );
};

export default RightSidebar;
