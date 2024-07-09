import { useState, useEffect } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";
import { useDebounce } from "../../hooks/useDebounce";

export default function ManageSeller() {
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "Aaron",
      email: "duriany12@gmail.com",
      storeId: 10,
      userId: 1,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 2,
      name: "Brother",
      email: "duriany12@gmail.com",
      storeId: 9,
      userId: 2,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 3,
      name: "Carol",
      email: "duriany12@gmail.com",
      storeId: 8,
      userId: 3,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 4,
      name: "Donal",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 5,
      name: "Eevee",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 7,
      name: "Francis",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 8,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 9,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 10,
      name: "Frandrive31",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 11,
      name: "Frandrive32",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 13,
      name: "Frandrive33",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 14,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 15,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 16,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 17,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 18,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    // Your store data...
  ]);

  const [filteredStores, setFilteredStores] = useState(stores);
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
      const filtered = stores.filter((store) => {
        const query = debouncedSearchQuery.toLowerCase();
        return (
          store.name.toLowerCase().includes(query) ||
          store.storeId.toString().includes(query) ||
          store.userId.toString().includes(query)
        );
      });
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  }, [debouncedSearchQuery, stores]);

  const toggleBlock = (storeId) => {
    const updatedStores = filteredStores.map((store) =>
      store.id === storeId ? { ...store, blocked: !store.blocked } : store
    );
    setFilteredStores(updatedStores);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStores = filteredStores.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      key: "name",
      label: "Store Name",
      sortable: true,
      render: (value) => <div className="text-sm font-medium text-gray-900">{value}</div>,
    },
    {
      key: "storeId",
      label: "Store ID",
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
      label: (store) => (store.blocked ? "Unblock" : "Block"),
      onClick: toggleBlock,
      className: (store) => (store.blocked ? "text-red-600" : "text-green-600"),
    },
  ];

  return (
    <div className="flex gap-6 bg-graybg">
      <div className="flex flex-col h-full w-full m-6">
        <div className="sticky top-0 z-10 bg-graybg">
          <SearchBarAdminPage
            placeholder="Durian (search store)"
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>
        <div className="flex-1 p-4 pt-2">
          <div className="text-md p-2 pt-0">
            Showing {currentStores.length} of {stores.length} stores
          </div>
          <div className="">
            <StoreList
              stores={currentStores}
              columns={columns}
              actions={actions}
              initialSortConfig={{ key: "name", direction: "asc" }}
            />
          </div>
        </div>
        <div className="p-2 py-0">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredStores.length}
            paginate={paginate}
            currentPage={currentPage}
            showFirstLastButtons={true}
            firstLabel="<<"
            lastLabel=">>"
          />
        </div>
      </div>
      <div className="w-screen h-screen bg-green-200 sticky z-10 top-0">Seller data</div>
    </div>
  );
}
