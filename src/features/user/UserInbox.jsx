import { SearchIcon } from "../../icons";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";

function UserMessageBox() {
  return (
    <>
      <div className="flex p-3 pl-4 hover:bg-slate-100">
        <div className="pr-4 py-2 xl:w-auto xl:h-auto">
          <img
            src={durianProfileLogo}
            alt="Durian profile mock picture"
            className="w-auto h-auto xl:w-16 xl:h-16 "
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Freshie Foodie - Admin</div>
          <div className="text-xs">
            We are excited to let our followers know that we offered vouchers
            from September 2024
          </div>
        </div>
        <div className="text-xs pl-7 pr-2 flex items-start pt-1">18:20</div>
      </div>
    </>
  );
}

export default function UserInbox() {
  return (
    <div className="">
      <form className="flex justify-between items-center gap-2 px-4 py-3">
        <input
          value=""
          onChange=""
          className="flex w-full bg-white p-1 pl-4 border border-gray-300 rounded-full"
          type="text"
          placeholder="Search Inbox "
        />
        <SearchIcon />
      </form>

      <UserMessageBox />

      <UserMessageBox />

      <UserMessageBox />

      <UserMessageBox />

      <UserMessageBox />

      <UserMessageBox />

      <UserMessageBox />
      <UserMessageBox />
      <UserMessageBox />
    </div>
  );
}
