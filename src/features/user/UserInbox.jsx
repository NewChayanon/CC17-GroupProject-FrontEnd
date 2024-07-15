import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { AnnouncementIcon, SearchIcon } from "../../icons";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import { formatDateTime, getDayOfWeek } from "../../utils/datetime-conversion";
import useStore from "../../zustand/store";
import { useDebounce } from "../../hooks/useDebounce";

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
          <div className="text-xs">{message.message.slice(0, 60)}</div>
        </div>
        <div className="text-xs pl-7 pr-2 flex items-start pt-1">
          {formatDateTime(message.createdAt)}
        </div>
      </div>
    </>
  );
}

export default function UserInbox() {
  const inboxMessages = useStore((state) => state.inboxMessages);
  const countUnreadMessage = useStore((state) => state.countUnreadMessage);
  const getInboxMessages = useStore((state) => state.getInboxMessages);
  const isLoadingInboxMessages = useStore(
    (state) => state.isLoadingInboxMessages
  );
  const [filteredInboxMessage, setFilteredInboxMessage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInboxMessageData = async () => {
      const res = await getInboxMessages();
      // console.log("get response from zustand getinboxmessage", res);
    };
    fetchInboxMessageData();
    setFilteredInboxMessage(inboxMessages);
  }, []);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = inboxMessages.filter(
        (message) =>
          message.topic
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          message.message
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredInboxMessage(filtered);
    } else {
      setFilteredInboxMessage(inboxMessages);
    }
  }, [debouncedSearchQuery, inboxMessages]);

  return (
    <div className="">
      {/* <form className="flex justify-between items-center gap-2 px-4 py-3">
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
      </form> */}
      <SearchBarAdminPage
        placeholder="Search by store name"
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      {inboxMessages[0] ? (
        filteredInboxMessage.map((message) => (
          <UserMessageBox message={message} />
        ))
      ) : (
        <div>Empty State</div>
      )}
    </div>
  );
}
