import { useState } from "react";
import SearchBarAdminPage from "./components/SearchBarAdminPage";
import StoreList from "./components/StoreList";

export default function ManageSeller() {
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "AAAAAAAAA",
      email: "duriany12@gmail.com",
      storeId: 11,
      userId: 44,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 2,
      name: "BBBBBBBBBB",
      email: "duriany12@gmail.com",
      storeId: 22,
      userId: 33,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 3,
      name: "CCCCCCCCCC",
      email: "duriany12@gmail.com",
      storeId: 33,
      userId: 22,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    {
      id: 4,
      name: "DDDDDDDDD",
      email: "duriany12@gmail.com",
      storeId: 44,
      userId: 11,
      lastUpdated: "2024-05-02 10:20:00",
      blocked: false,
    },
    // Add more store data here
  ]);

  const [filteredStores, setFilteredStores] = useState(stores);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = stores.filter((store) =>
        store.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  };

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

  return (
    <div className="flex justify-between p-6 gap-6">
      <div className="w-full h-full bg-yellow-200 flex flex-col justify-center items-center ">
        <SearchBarAdminPage
          placeholder="Durian (search store)"
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            Showing {filteredStores.length} of {stores.length} stores
          </div>
        </div>
        <StoreList stores={filteredStores} toggleBlock={toggleBlock} sortStores={sortStores} />
      </div>
      <div className="w-full h-full bg-green-200">Seller Data</div>
    </div>
  );
}
