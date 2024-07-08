import React, { useState } from "react";
import searchPlaces from "../apis/3rdparty/googleMapApi";
import findPlaces from "../features/map/google-search-location";
import { SearchIcon } from "../icons";

export default function SearchBar() {
  const [searchBy, setSearchBy] = useState("");
  const [searchWhen, setSearchWhen] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchInput = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleSelectSearchBy = (e) => {
    setSearchBy(event.target.value);
  };
  const handleSelectWhen = (e) => {
    setSearchWhen(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(
      "Search By",
      searchBy,
      "Search When",
      searchWhen,
      "Search Keyword",
      searchKeyword
    );
    alert("Searching!");
    if (searchBy === "LOCATION") {
      // ยิงไปใช้ service ของ google
      findPlaces(searchKeyword);
      // searchPlaces();
    } else {
    }
    // รอยิง api ไปหา Server
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 p-2 bg-white rounded-lg h-9 text-sm text-graydarktext"
    >
      <select
        name="searchby"
        id="searchby"
        value={searchBy}
        onChange={handleSelectSearchBy}
        className="bg-white"
      >
        <option value="" disabled>
          Search By
        </option>
        <option value="PRODUCT">Product</option>
        <option value="STORE">Store</option>
        <option value="LOCATION">Location</option>
      </select>
      <input
        value={searchKeyword}
        onChange={handleSearchInput}
        className="flex w-32 bg-white"
        type="text"
        placeholder="Search"
      ></input>
      <select
        name="when"
        id="when"
        value={searchWhen}
        onChange={handleSelectWhen}
        className="bg-white"
      >
        <option value="" disabled>
          When
        </option>
        <option value="TODAY">Today</option>
        <option value="TOMORROW">Tomorrow</option>
        <option value="THISWEEK">This Week</option>
        <option value="THISMONTH">This Month</option>
      </select>
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}
