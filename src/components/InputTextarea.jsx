/* eslint-disable react/prop-types */
const heightMap = {
  10: "h-10",
};

const fontSizeMap = {
  base: "text-base",
  sm: "text-sm",
};

export default function InputTextarea({
  placeholder,
  error,
  value,
  onChange,
  name,
  rows = 4,
  cols = 30,
  fontSize = "base",
}) {
  return (
    <div className="flex flex-col w-full">
      <textarea
        placeholder={placeholder}
        className={`grow p-2 
        } bg-absolutewhite rounded-md border-2 ${fontSizeMap[fontSize]} focus:ring-0 focus:outline-none ${
          error ? "border-red-500" : "border-graylighttext"
        } `}
        rows={rows}
        cols={cols}
        value={value}
        onChange={onChange}
        name={name}
      ></textarea>
      {error ? <small className=" text-red-500">{error}</small> : null}
    </div>
  );
}
