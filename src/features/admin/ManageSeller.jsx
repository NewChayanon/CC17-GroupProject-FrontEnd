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
      storeId: 11,
      userId: 44,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 2,
      name: "Brother",
      email: "duriany12@gmail.com",
      storeId: 22,
      userId: 33,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 3,
      name: "Carol",
      email: "duriany12@gmail.com",
      storeId: 33,
      userId: 22,
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
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 11,
      name: "Frandrive",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 13,
      name: "Frandrive",
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
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
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
      const filtered = stores.filter((store) =>
        store.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  }, [debouncedSearchQuery, stores]);

  const sortStores = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedArray = [...filteredStores].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredStores(sortedArray);
    setSortConfig({ key, direction });
  };

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

  return (
    <div className="flex justify-between p-6 gap-6">
      <div className="w-full h-screen overflow-y-auto px-4">
        <div className="sticky top-0 z-10 w-full flex justify-center items-center">
          <SearchBarAdminPage
            placeholder="Durian (search store)"
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>
        <div className="text-lg font-bold p-2">
          Showing {currentStores.length} of {stores.length} stores
        </div>
        <StoreList stores={currentStores} toggleBlock={toggleBlock} sortStores={sortStores} />
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
      <div className="w-full h-full bg-green-200">Seller Data</div>
    </div>
  );
}
