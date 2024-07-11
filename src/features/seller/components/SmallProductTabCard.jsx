export default function SmallProductTabCard({
  productImage,
  productName,
  productDescription,
  productPrice,
  productUnit,
}) {
  return (
    <div className="flex shadow bg-verylightyellow rounded-lg">
      <div className="h-32 w-48">
        <img
          src={productImage}
          alt="Event Image"
          className="w-full h-full bg-verylightyellow"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col p-2 pl-6 pt-4 pr-4">
          <div className="font-semibold">{productName}</div>
          <div className="text-xs">{productDescription}</div>
        </div>
        <div className="flex justify-end items-end pb-8 text-sm font-semibold">
          <div className="text-red-500">{productPrice}&nbsp;THB</div>
          <div>&nbsp;/&nbsp;{productUnit}</div>
        </div>
      </div>
      <div className="flex justify-end items-end p-3 text-xs text-primary underline font-semibold">
        edit
      </div>
    </div>
  );
}
