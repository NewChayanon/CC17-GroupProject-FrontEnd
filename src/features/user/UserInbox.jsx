import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnnouncementIcon, SearchIcon } from "../../icons";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import useStore from "../../zustand/store";

function UserMessageBox({ message }) {
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
          <div className="font-semibold">{message.topic}</div>
          <div className="text-xs">{message.message}</div>
        </div>
        <div className="text-xs pl-7 pr-2 flex items-start pt-1">
          {message.createdAt}
        </div>
      </div>
    </>
  );
}

export default function UserInbox() {
  const inboxMessages = useStore((state) => state.inboxMessages);
  const getInboxMessages = useStore((state) => state.getInboxMessages);
  const isLoadingInboxMessages = useStore(
    (state) => state.isLoadingInboxMessages
  );
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInboxMessageData = async () => {
      const res = await getInboxMessages();
    };
    fetchInboxMessageData();
  }, []);
  console.log("inboxMessage", inboxMessages);
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
        <div
          className="xl:hidden"
          onClick={() => navigate("/user/inbox-message")}
        >
          <AnnouncementIcon />
        </div>
      </form>
      {isLoadingInboxMessages ? (
        inboxMessages.map((message) => <UserMessageBox message={message} />)
      ) : (
        <div>Empty State</div>
      )}
    </div>
  );
}
