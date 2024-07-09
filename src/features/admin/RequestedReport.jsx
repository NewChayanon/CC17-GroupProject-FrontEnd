import { useState } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import dayjs from "dayjs";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";

export default function RequestedReport() {
  const [reports, setReports] = useState([
    {
      id: 1,
      userId: 1,
      name: "Arron",
      topic: "The merchant is rude",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure omnis amet ex natus optio modi laboriosam atque quis, ipsum voluptatibus in perferendis ullam repellendus culpa officiis quasi maiores. Enim nemo optio at? Alias tenetur saepe dignissimos natus repellendus beatae perspiciatis officia ad iste inventore? Id neque nihil perferendis iure blanditiis.",
      createdAt: "2024-04-18 20:00:00",
    },
    {
      id: 2,
      userId: 1,
      name: "Barron",
      topic: "Location not found",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure omnis amet ex natus optio modi laboriosam atque quis, ipsum voluptatibus in perferendis ullam repellendus culpa officiis quasi maiores. Enim nemo optio at? Alias tenetur saepe dignissimos natus repellendus beatae perspiciatis officia ad iste inventore? Id neque nihil perferendis iure blanditiis.",
      createdAt: "2024-04-19 20:00:00",
    },
    {
      id: 3,
      userId: 1,
      name: "Carron",
      topic: "Coupon Problem",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure omnis amet ex natus optio modi laboriosam atque quis, ipsum voluptatibus in perferendis ullam repellendus culpa officiis quasi maiores. Enim nemo optio at? Alias tenetur saepe dignissimos natus repellendus beatae perspiciatis officia ad iste inventore? Id neque nihil perferendis iure blanditiis.",
      createdAt: "2024-04-20 20:00:00",
    },
  ]);

  const [filteredReports, setFilteredReports] = useState(reports);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const debouncedSearchQuery = useDebounce(searchQuery, 1200);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = reports.filter((report) => {
        const query = debouncedSearchQuery.toLowerCase();
        const dateFormatted = dayjs(report.lastUpdated).format("YYYY-MM-DD");
        return (
          report.topic.toLowerCase().includes(query) ||
          report.createdAt.toString().includes(query) ||
          report.id.toString().includes(query) ||
          dateFormatted.includes(query)
        );
      });
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [debouncedSearchQuery, reports]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      key: "id",
      label: "Report ID",
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
            placeholder="Search report list"
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>
        <div className="flex-1 p-4 pt-2">
          <div className="text-md p-2 pt-0">
            Showing {currentReports.length} of {reports.length} reports
          </div>
          <div className="">
            <StoreList
              stores={currentReports}
              columns={columns}
              initialSortConfig={{ key: "name", direction: "asc" }}
            />
          </div>
        </div>
        <div className="p-2 py-0">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredReports.length}
            paginate={paginate}
            currentPage={currentPage}
            showFirstLastButtons={true}
            firstLabel="<<"
            lastLabel=">>"
          />
        </div>
      </div>
      <div className="w-screen h-screen bg-red-500 sticky z-10 top-0">Announcement data</div>
    </div>
  );
}
