import React, { useState } from "react";
import searchPlaces from "../apis/3rdparty/googleMapApi";
import authApi from "../apis/auth";
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
    setSearchBy(e.target.value);
  };
  const handleSelectWhen = (e) => {
    setSearchWhen(e.target.value);
  };
  const handleSearch = async (e) => {
    try {
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

      const result = await authApi.getEventBySearch(
        searchBy,
        searchKeyword,
        searchWhen
      );
      console.log("result from search", result.data);
      // รอยิง api ไปหา Server
    } catch (err) {
      console.log("error from api getting event from search", err);
    }
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
        <option value="product">Product</option>
        <option value="store">Store</option>
        <option value="location">Location</option>
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
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="thisweek">This Week</option>
        <option value="thismonth">This Month</option>
      </select>
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}
