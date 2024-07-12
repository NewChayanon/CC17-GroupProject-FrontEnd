import { useState, useEffect } from "react";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import StoreList from "./components/StoreList";
import Pagination from "../../components/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import adminApi from "../../apis/admin";

export default function ManageSeller() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState(stores);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countRow, setCountRow] = useState(0);
  const itemsPerPage = 10;

  const debouncedSearchQuery = useDebounce(searchQuery, 1200);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const fetchSeller = async () => {
    try {
      const data = {
        pages: currentPage,
        pageSize: itemsPerPage,
        sortBy: "id",
      };
      const seller = await adminApi.allSeller(data);
      console.log("seller", seller.data.result);
      setStores(seller.data.result);
      setCountRow(seller.data.countSeller);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSeller();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = stores.filter((store) => {
        const query = debouncedSearchQuery.toLowerCase();
        return (
          store.storeName.toLowerCase().includes(query) ||
          store.storeProfileId.toString().includes(query) ||
          store.id.toString().includes(query)
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
      key: "storeName",
      label: "Store Name",
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
              initialSortConfig={{ key: "storeName", direction: "asc" }}
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
      {/* <div className="w-screen h-screen bg-green-200 sticky z-10 top-0">Seller data</div> */}
    </div>
  );
}
