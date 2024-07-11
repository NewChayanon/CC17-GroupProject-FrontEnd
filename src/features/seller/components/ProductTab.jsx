export default function ProductTab({
  productImage,
  productName,
  productDescription,
  productPrice,
  productUnit,
}) {
  return (
    <div className="flex shadow bg-verylightyellow rounded-lg ">
      <div className="bg-yellow-500 h-28 w-36">{productImage}</div>
      <div className="flex flex-col p-2 pl-3 pr-4">
        <div className="font-semibold">{productName}</div>
        <div className="text-xs">{productDescription}</div>

        <div className="flex justify-end text-sm font-semibold">
          <div>{productPrice} THB</div> <div>/{productUnit}</div>
        </div>
        <div className="flex justify-end text-xs text-primary underline font-semibold">
          edit
        </div>
      </div>
    </div>
  );
}
