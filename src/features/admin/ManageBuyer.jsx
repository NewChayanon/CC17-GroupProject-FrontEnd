import { useState } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";
import adminApi from "../../apis/admin";

export default function ManageBuyer() {
  const [buyers, setBuyers] = useState([]);
  console.log("buyers", buyers);

  const [filteredBuyers, setFilteredBuyers] = useState(buyers);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countRow, setCountRow] = useState(0);
  const itemsPerPage = 10;

  console.log("filteredBuyers", filteredBuyers);

  const debouncedSearchQuery = useDebounce(searchQuery, 1200);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const fetchAllBuyer = async () => {
    try {
      const data = {
        pages: currentPage,
        pageSize: itemsPerPage,
        sortBy: "id",
      };
      const buyer = await adminApi.allBuyer(data);
      console.log("buyer", buyer.data);
      setBuyers(buyer.data.result);
      setCountRow(buyer.data.countBuyer);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllBuyer();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = buyers.filter((buyer) => {
        const query = debouncedSearchQuery.toLowerCase();
        return (
          buyer.username.toLowerCase().includes(query) ||
          buyer.storeProfileId.toString().includes(query) ||
          buyer.id.toString().includes(query)
        );
      });
      setFilteredBuyers(filtered);
    } else {
      setFilteredBuyers(buyers);
    }
  }, [debouncedSearchQuery, buyers]);

  const toggleBlock = (buyerId) => {
    const updatedBuyers = filteredBuyers.map((buyer) =>
      buyer.id === buyerId ? { ...buyer, blocked: !buyer.blocked } : buyer
    );
    setFilteredBuyers(updatedBuyers);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  console.log("indexOfLastItem", indexOfLastItem);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  console.log("indexOfFirstItem", indexOfFirstItem);
  const currentBuyers = filteredBuyers.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentBuyers", currentBuyers);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      key: "username",
      label: "Buyer Name",
      sortable: true,
      render: (value) => <div className="text-sm font-medium text-gray-900">{value}</div>,
    },
    {
      key: "storeProfileId",
      label: "Store ID",
      sortable: true,
      className: "text-center",
    },
    {
      key: "id",
      label: "User ID",
      sortable: true,
      className: "text-center",
    },
  ];

  const actions = [
    {
      label: (buyer) => (buyer.blocked ? "Unblock" : "Block"),
      onClick: toggleBlock,
      className: (buyer) => (buyer.blocked ? "text-red-600" : "text-green-600"),
    },
  ];
  console.log("buyers1", buyers);

  return (
    <div className="flex gap-6 bg-graybg">
      <div className="flex flex-col h-full w-full m-6">
        <div className="sticky top-0 z-10 bg-graybg">
          <SearchBarAdminPage
            placeholder="Durian (search buyer)"
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>
        <div className="flex-1 p-4 pt-2">
          <div className="text-md p-2 pt-0">
            Showing {currentBuyers?.length} of {buyers?.length} buyers
          </div>
          <div className="">
            <StoreList
              stores={currentBuyers}
              columns={columns}
              actions={actions}
              initialSortConfig={{ key: "username", direction: "asc" }}
            />
          </div>
        </div>
        <div className="p-2 py-0">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredBuyers.length}
            paginate={paginate}
            currentPage={currentPage}
            showFirstLastButtons={true}
            firstLabel="<<"
            lastLabel=">>"
          />
        </div>
      </div>
      {/* <div className="w-screen h-screen bg-purple-400 sticky z-10 top-0">Buyer data</div> */}
    </div>
  );
}
