import { useState } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import dayjs from "dayjs";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";
import adminApi from "../../apis/admin";

export default function Announcement() {
  const [announces, setAnnounces] = useState([]);

  const [filteredAnnounces, setFilteredAnnounces] = useState(announces);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const dateTime = new Date(store.updatedAt).toLocaleString("en-GB")

  const itemsPerPage = 10;

  const debouncedSearchQuery = useDebounce(searchQuery, 1200);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
const fetchInbox = async()=>{
try {
  const result = await adminApi.allMessage()
  setAnnounces(result.data)
} catch (error) {
  console.log(error)
};
}
useEffect(()=>{
  fetchInbox()
},[]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = announces.filter((announce) => {
        const query = debouncedSearchQuery.toLowerCase();
        const dateFormatted = dayjs(announce.lastUpdated).format("YYYY-MM-DD");
        return (
          announce.topic.toLowerCase().includes(query) ||
          announce.createdAt.toString().includes(query) ||
          announce.id.toString().includes(query) ||
          dateFormatted.includes(query)
        );
      });
      setFilteredAnnounces(filtered);
    } else {
      setFilteredAnnounces(announces);
    }
  }, [debouncedSearchQuery, announces]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnnounces = filteredAnnounces.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      key: "id",
      label: "Topic ID",
      sortable: true,
      className: "text-center",
    },
    {
      key: "createdAt",
      label: "Action Date",
      sortable: true,
      className: "text-center",
    },
    {
      key: "topic",
      label: "Subject",
      sortable: false,
      className: "text-center",
    },
  ];

  return (
    <div className="flex gap-6 bg-graybg">
      <div className="flex flex-col h-full w-full m-6">
        <div className="sticky top-0 z-10 bg-graybg">
          <SearchBarAdminPage
            placeholder="Search your announcement"
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>
        <div className="flex-1 p-4 pt-2">
          <div className="text-md p-2 pt-0">
            Showing {currentAnnounces.length} of {announces.length} announcements
          </div>
          <div className="">
            <StoreList
              stores={currentAnnounces}
              columns={columns}
              initialSortConfig={{ key: "name", direction: "asc" }}
            />
          </div>
        </div>
        <div className="p-2 py-0">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredAnnounces.length}
            paginate={paginate}
            currentPage={currentPage}
            showFirstLastButtons={true}
            firstLabel="<<"
            lastLabel=">>"
          />
        </div>
      </div>
      <div className="w-screen h-screen bg-blue-400 sticky z-10 top-0">Announcement data</div>
    </div>
  );
}
