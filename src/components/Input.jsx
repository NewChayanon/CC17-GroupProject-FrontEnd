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
    <div className="flex flex-col">
      <label
        className={`input input-bordered ${
          heightMap[height]
        } flex items-center gap-2 bg-absolutewhite ${
          error ? "input-error" : null
        }`}
      >
        <input
          placeholder={placeholder}
          type={type}
          className="grow"
          value={value}
          onChange={onChange}
          name={name}
        />
      </label>
      <div className="flex h-1">
        {error ? <small className=" text-red-500">{error}</small> : null}
      </div>
    </div>
  );
}
