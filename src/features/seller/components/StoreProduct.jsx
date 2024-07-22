import { useEffect } from "react";
import useStore from "../../../zustand/store";
import SmallProductTabCard from "./SmallProductTabCard";

export default function StoreProduct() {
  const getMyStoreProducts = useStore((state) => state.getMyStoreProducts);
  const productInfo = useStore((state) => state.productInfo);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getMyStoreProducts();
      console.log(res);
    };

    fetchdata();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {productInfo.length >= 1 ? (
        productInfo.map((el) => (
          <SmallProductTabCard
            key={el.productId}
            productImage={el.productImage}
            productName={el.productName}
            productDescription={el.productDescription}
            productPrice={el.productPrice}
            productUnit={el.productUnit}
          />
        ))
      ) : (
        <div>
          <p>This event has no product yet.</p>
        </div>
      )}
    </div>
  );
}
