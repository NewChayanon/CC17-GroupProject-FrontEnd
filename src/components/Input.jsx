/* eslint-disable react/prop-types */
const heightMap = {
  10: "h-10",
  9: "h-9",
  8: "h-8",
};

export default function Input({
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  name,
  height = "",
}) {
  return (
    <div className="flex flex-col w-full">
      <input
        placeholder={placeholder}
        type={type}
        className={`text-sm grow p-2 pl-3 ${
          heightMap[height]
        } bg-absolutewhite rounded-md border border-opacity-60 focus:ring-0 focus:outline-none ${
          error ? "border-red-500" : "border-graylighttext"
        } `}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error ? <small className=" text-red-500">{error}</small> : null}
    </div>
  );
}
