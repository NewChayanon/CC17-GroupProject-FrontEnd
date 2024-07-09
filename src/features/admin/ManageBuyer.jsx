import { useState } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";

export default function ManageBuyer() {
  const [buyers, setBuyers] = useState([
    {
      id: 2,
      name: "Aaron",
      email: "duriany12@gmail.com",
      buyerId: 11,
      userId: 44,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 1,
      name: "Brother",
      email: "duriany12@gmail.com",
      buyerId: 22,
      userId: 33,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 3,
      name: "Carol",
      email: "duriany12@gmail.com",
      buyerId: 33,
      userId: 22,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 4,
      name: "Donal",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 5,
      name: "Eevee",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 7,
      name: "Francis",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 8,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 9,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 10,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 11,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 13,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 14,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 15,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 16,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 17,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 18,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      buyerId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    // Your store data...
  ]);

  const [filteredBuyers, setFilteredBuyers] = useState(buyers);
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
      const filtered = buyers.filter((buyer) => {
        const query = debouncedSearchQuery.toLowerCase();
        return (
          buyer.name.toLowerCase().includes(query) ||
          buyer.buyerId.toString().includes(query) ||
          buyer.userId.toString().includes(query)
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
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBuyers = filteredBuyers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      key: "name",
      label: "Buyer Name",
      sortable: true,
      render: (value) => <div className="text-sm font-medium text-gray-900">{value}</div>,
    },
    {
      key: "buyerId",
      label: "Buyer ID",
      sortable: true,
      className: "text-center",
    },
    {
      key: "userId",
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
            Showing {currentBuyers.length} of {buyers.length} buyers
          </div>
          <div className="">
            <StoreList
              stores={currentBuyers}
              columns={columns}
              actions={actions}
              initialSortConfig={{ key: "name", direction: "asc" }}
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
      <div className="w-screen h-screen bg-purple-400 sticky z-10 top-0">Buyer data</div>
    </div>
  );
}
