import React from "react";

export default function ProductTabCard({ product }) {
  return (
    <div className="flex gap-2 rounded-xl bg-white shadow-md">
      <div style={{ overflow: "hidden" }}>
        <img
          className="rounded-l-xl"
          style={{
            width: "127px",
            height: "89px",
            objectFit: "cover",
            display: "block",
          }}
          src={product.productImage}
        />
      </div>
      <div className="p-2 grow flex flex-col justify-between">
        <div>
          <div className="text-primary text-base">{product.productName}</div>
          <div className="text-xs">{product.productDescription}</div>
        </div>
        <div className="flex text-sm justify-end">
          <div>{product.price} Unit</div>
        </div>
      </div>
    </div>
  );
}
