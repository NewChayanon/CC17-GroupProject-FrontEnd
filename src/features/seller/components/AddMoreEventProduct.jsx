import { useState } from "react";
import useStore from "../../../zustand/store";

export default function AddMoreEventProduct() {
  const productInfo = useStore((state) => state.productInfo);
  const [inputError, setInputError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [eventItem, setEventItem] = useState([]);
  const [eventItemDisplay, setEventItemDisplay] = useState([]);
  const handleChangeProduct = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    setInputError({
      ...inputError,
      eventItem: "",
    });

    const productIndex = eventItemDisplay.findIndex(
      (item) => item.productId === selectedValue.productId
    );

    if (productIndex === -1) {
      setSelectedProduct(selectedValue);
      setEventItem((prevItems) => [
        ...prevItems,
        { productId: selectedValue.productId },
      ]);
      setEventItemDisplay((prevItems) => [...prevItems, selectedValue]);
    } else {
      setInputError({
        ...inputError,
        eventItem: "Product already selected",
      });
    }
  };

  return (
    <div className="w-1/2 flex flex-col">
      <select
        onChange={handleChangeProduct}
        value=""
        className="p-1 pl-2 font-normal w-96 rounded-md text-sm"
      >
        <option value="" disabled>
          Select Product
        </option>
        {productInfo &&
          productInfo.map((product, index) => (
            <option key={index} value={JSON.stringify(product)}>
              {product?.productName}
            </option>
          ))}
      </select>
      <small className="text-red-500">{inputError.eventItem}</small>
    </div>
  );
}
