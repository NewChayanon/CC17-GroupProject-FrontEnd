import { SearchIcon } from "../../icons";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";

function FollowerBox() {
  return (
    <>
      <div className="flex p-3 pl-4 hover:bg-slate-300">
        <div className="pr-4 xl:w-auto xl:h-auto">
          <img
            src={durianProfileLogo}
            alt="Durian profile mock picture"
            className="w-16 h-16 xl:w-16 xl:h-16 "
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-semibold">Username - Follower</div>
          <div className="text-xs">This buyer is also a seller!</div>
        </div>
      </div>
    </>
  );
}

export default function Followers() {
  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex flex-col gap-2 px-4 py-3">
        <div>
          <form className="flex justify-between items-center gap-2">
            <input
              value=""
              onChange=""
              className="flex w-full bg-white p-1 pl-4 border border-gray-300 rounded-full"
              type="text"
              placeholder="Search Follower "
            />
            <SearchIcon />
          </form>
        </div>

        <div className="flex text-sm font-semibold pl-2 text-primary ">
          <div>Number of followers :</div> <div>&nbsp;121</div>
          <div> &nbsp;users</div>
        </div>
      </div>
      <div>
        <FollowerBox />
        <FollowerBox />
        <FollowerBox />
        <FollowerBox />
      </div>
    </div>
  );
}
