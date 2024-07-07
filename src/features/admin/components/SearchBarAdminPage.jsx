/* eslint-disable react/prop-types */
import MagnifierSvg from "../../../icons/MagnifierSvg";

export default function SearchBarAdminPage({ placeholder, searchQuery, handleSearch }) {
  return (
    <div className="flex justify-center w-full">
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full py-3 pl-3 pr-10 border rounded-2xl shadow-sm focus:outline-none focus:border-transparent bg-absolutewhite"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifierSvg />
        </div>
      </div>
    </div>
  );
}
