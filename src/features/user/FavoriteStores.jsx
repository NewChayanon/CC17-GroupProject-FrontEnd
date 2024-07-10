import { useEffect, useState } from "react";
import userApi from "../../apis/user";
import SearchBarAdminPage from "../../components/SearchBarAdminPage";
import FavoriteStoreCard from "./components/FavoriteStoreCard";
import { useDebounce } from "../../hooks/useDebounce";
import EmptyState from "../../components/EmptyState";
import { StoreIcon } from "../../icons";

export default function FavoriteStores() {
  const [favoriteStores, setFavoriteStore] = useState([]);
  const [filteredFavoriteStores, setFilteredFavoriteStore] = useState([]);
  const [isUpdateFavoriteStore, setIsUpdateFavoriteStore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  // API to getch favorite vendor data
  // copy ของ interested event เพื่อให้ update state ได้
  const fetchFavoriteStores = async () => {
    try {
      const result = await userApi.getFavoriteStore();
      console.log("result from API getting favorite store", result);
      const preFavoriteStoreArr = result.data;
      for (let store of preFavoriteStoreArr) {
        store.follow = true;
      }
      setFavoriteStore(preFavoriteStoreArr);
      setFilteredFavoriteStore(preFavoriteStoreArr);
    } catch (err) {
      console.log("error from API getting store data", err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  // fetch ข้อมูลใหม่ ทุกครั้งที่ เข้าหน้านี้ครั้งแรก หรือเมื่อมีการกด unfollow store ที่จะ monitor ด้วย "isUpdateFavoriteStore"

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = favoriteStores.filter((storeDetail) =>
        storeDetail.storeName
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredFavoriteStore(filtered);
    } else {
      setFilteredFavoriteStore(favoriteStores);
    }
  }, [debouncedSearchQuery, favoriteStores]);

  useEffect(() => {
    fetchFavoriteStores();
    setIsUpdateFavoriteStore(false);
  }, [isUpdateFavoriteStore]);
  return (
    <div className="flex flex-col gap-4">
      <SearchBarAdminPage
        placeholder="Search by store name"
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      {filteredFavoriteStores[0] ? (
        <>
          {filteredFavoriteStores.map((storeDetail, index) => (
            <FavoriteStoreCard
              storeDetail={storeDetail}
              key={index}
              setIsUpdateFavoriteStore={setIsUpdateFavoriteStore}
            />
          ))}{" "}
        </>
      ) : (
        <EmptyState
          icon={<StoreIcon />}
          message="You have not followed any store yet."
        />
      )}
    </div>
  );
}
