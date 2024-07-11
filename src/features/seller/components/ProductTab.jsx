import { useEffect } from "react";
import useStore from "../../../zustand/store";
import SmallProductTabCard from "./SmallProductTabCard";

export default function ProductTab() {
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
    <div>
      {productInfo.map((el) => (
        <SmallProductTabCard
          productImage={el.productImage}
          productName={el.productName}
          productDescription={el.productDescription}
          productPrice={el.productPrice}
          productUnit={el.productUnit}
        />
      ))}
    </div>
  );
}
