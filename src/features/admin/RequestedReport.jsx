import { useState, useEffect } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import dayjs from "dayjs";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";
import adminApi from "../../apis/admin";

export default function RequestedReport() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState(reports);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  console.log(reports);

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

      const report = await adminApi.allReport(data);
      setReports(report.data);
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
          report.storeNameReported.toLowerCase().includes(query) ||
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

  const handleRowClick = (report) => {
    setSelectedReport(report);
  };

  const columns = [
    {
      key: "id",
      label: "Report ID",
      sortable: true,
      className: "text-center",
      onClick: handleRowClick,
    },
    {
      key: "storeNameReported",
      label: "Store Name",
      sortable: true,
      className: "text-center",
      onClick: handleRowClick,
    },
    {
      key: "topic",
      label: "Subject",
      sortable: false,
      className: "text-center",
      onClick: handleRowClick,
    },
    {
      key: "createdAt",
      label: "Action Date",
      sortable: true,
      className: "text-center",
      onClick: handleRowClick,
    },
  ];

  return (
    <div className="flex gap-6 bg-graybg min-h-screen">
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
          <div>
            <StoreList
              stores={currentReports}
              columns={columns}
              initialSortConfig={{ key: "name", direction: "asc" }}
              onRowClick={handleRowClick}
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
      <div className="w-screen h-screen bg-absolutewhite sticky z-1 top-0 flex flex-col items-center p-6">
        {selectedReport && (
          <div className="w-full max-w-2xl p-4 mb-6 border rounded-xl shadow-md">
            <div className="mb-4">
              <div className="flex justify-between">
                <span className="font-bold text-green-700">From</span>
                <span className="font-bold text-green-700">User Id</span>
              </div>
              <div className="flex justify-between">
                <span>{selectedReport.username}</span>
                <span>{selectedReport.id}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-green-700">Subject</span>
              <div className="mt-1">{selectedReport.topic}</div>
            </div>
            <div className="mb-4 p-4 border rounded-md">
              <p className="text-sm break-words w-80 h-36">{selectedReport.message}</p>
            </div>
            <div className="mb-4">
              <span className="font-bold text-green-700">Evidence image</span>
              <img src={selectedReport.image} alt="Evidence" className="mt-1 rounded-md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
