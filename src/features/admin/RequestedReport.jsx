import { useState } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import dayjs from "dayjs";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";
import adminApi from "../../apis/admin";

export default function RequestedReport() {
  const [reports, setReports] = useState([]);

  const [filteredReports, setFilteredReports] = useState(reports);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countRow, setCountRow] = useState(0);

  const itemsPerPage = 10;

  const debouncedSearchQuery = useDebounce(searchQuery, 1200);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const fetchAllReport = async () => {
    try {
      const data = {
        pages: currentPage,
        pageSize: itemsPerPage,
        sortBy: "id",
      };

      // console.log(data)
      const report = await adminApi.allReport(data);
      console.log("report", report.data);
      setReports(report.data);
      // setCountRow(buyer.data.countBuyer);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllReport();
  }, []);

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
      key: "storeNameReported",
      label: "store name",
      sortable: true,
      className: "text-center",
    },
    {
      key: "topic",
      label: "Subject",
      sortable: false,
      className: "text-center",
    },
    {
      key: "createdAt",
      label: "Action Date",
      sortable: true,
      className: "text-center",
    },
  ];

  return (
    <div className="flex gap-6 bg-graybg">
      <div className="flex flex-col h-full w-full m-6">
        <div className="sticky top-0 bg-graybg">
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
      <div className="w-screen h-screen bg-absolutewhite sticky z-1 top-0">
        <div>
          <div className="p-4 mt-4 mx-10 border-d border-2 border-gray-500 flex justify-center rounded-xl h-96"></div>
        </div>
      </div>
    </div>
  );
}
