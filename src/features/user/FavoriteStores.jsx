import { useEffect, useState } from "react";
import userApi from "../../apis/user";
import FavoriteStoreCard from "./components/FavoriteStoreCard";

export default function FavoriteStores() {
  const [favoriteStores, setFavoriteStore] = useState([]);
  const [isUpdateFavoriteStore, setIsUpdateFavoriteStore] = useState(false);
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
    } catch (err) {
      console.log("error from API getting store data", err);
    }
  };
  // fetch ข้อมูลใหม่ ทุกครั้งที่ เข้าหน้านี้ครั้งแรก หรือเมื่อมีการกด unfollow store ที่จะ monitor ด้วย "isUpdateFavoriteStore"
  useEffect(() => {
    fetchFavoriteStores();
    setIsUpdateFavoriteStore(false);
  }, [isUpdateFavoriteStore]);
  return (
    <div>
      {favoriteStores.map((storeDetail, index) => (
        <FavoriteStoreCard
          storeDetail={storeDetail}
          key={index}
          setIsUpdateFavoriteStore={setIsUpdateFavoriteStore}
        />
      ))}
    </div>
  );
}
