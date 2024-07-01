/* eslint-disable react/prop-types */
const heightMap = {
  10: "h-10",
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
        className={`grow p-2 ${
          heightMap[height]
        } bg-absolutewhite rounded-md border-2 focus:ring-0 focus:outline-none ${
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
