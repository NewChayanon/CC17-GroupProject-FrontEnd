import { useState } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import dayjs from "dayjs";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";
import adminApi from "../../apis/admin";
import Button from "../../components/Button";
import InputTextarea from "../../components/InputTextarea";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import validateAnnounce from "./validators/announcement-validator";

const data = {
  topic: "",
  message: "",
};

export default function Announcement() {
  const [announces, setAnnounces] = useState([]);
  const [filteredAnnounces, setFilteredAnnounces] = useState(announces);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(data);
  const [inputError, setInputError] = useState(data);
  const [update, setUpdate] = useState(false);

  const itemsPerPage = 10;

  const debouncedSearchQuery = useDebounce(searchQuery, 1200);

  const fetchInbox = async () => {
    try {
      const result = await adminApi.allMessage();
      console.log(result.data);
      setAnnounces(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInbox();
  }, [update]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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

  const handleChangeInput = (e) => {
    console.log("handleChangeInput", e);
    setInput({ ...input, [e.target.name]: e.target.value });
    setInput({ ...input, [e.target.name]: e.target.value });

    setInputError({ ...inputError, [e.target.name]: "" });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateAnnounce(input);
      if (error) {
        setInputError(error);
        return;
      }
      setInputError(data);
      const response = await adminApi.createMessage(input);
      console.log("response", response);
      setUpdate(true);
      setOpen(false);
      setInput(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="flex items-center">
          <div className="sticky top-0 bg-gray flex flex-1 ">
            <SearchBarAdminPage
              placeholder="Search your announcement"
              searchQuery={searchQuery}
              handleSearch={handleSearch}
            />
          </div>
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
      <div className="w-screen h-screen bg-absolutewhite sticky z-1 top-0">
        <div>
          <div className="p-4 mt-4 mx-10 border-dashed border-2 border-gray-500 flex justify-center rounded-xl  ">
            <Button width="xl" onClick={() => setOpen(true)}>
              Create New Announcement
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} width="large">
              <div className="pb-4">
                <h1>Create Announcement</h1>
              </div>
              <div className="pb-4">
                <Input
                  placeholder="TOPIC"
                  height="10"
                  name="topic"
                  onChange={handleChangeInput}
                  value={input.topic}
                  error={inputError.topic}
                />
              </div>
              <div>
                <InputTextarea
                  height="10"
                  fontSize="sm"
                  placeholder="message"
                  name="message"
                  onChange={handleChangeInput}
                  value={input.message}
                  error={inputError.message}
                />
              </div>
              <div className="flex justify-center p-4">
                <Button width="md" onClick={handleSubmitForm}>
                  Send Announcement
                </Button>
              </div>
            </Modal>
          </div>
          <div className="p-4 mt-4 mx-10 border-d border-2 border-gray-500 flex justify-center rounded-xl h-96"></div>
        </div>
      </div>
    </div>
  );
}
