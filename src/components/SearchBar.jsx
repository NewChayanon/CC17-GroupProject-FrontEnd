import React, { useState } from "react";
import searchPlaces from "../apis/3rdparty/googleMapApi";
import authApi from "../apis/auth";
import findPlaces from "../features/map/google-search-location";
import { SearchIcon } from "../icons";

export default function SearchBar({
  eventArray,
  setEventArray,
  placeAutoCompleteRef,
  searchKeyword,
  setSearchKeyword,
  currentLocation,
}) {
  const [searchBy, setSearchBy] = useState("");
  const [searchWhen, setSearchWhen] = useState("");
  // const [searchKeyword, setSearchKeyword] = useState(""); // Lift state up to parent component (Main Map) to allow googleplaceautocomplete to update state

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
      console.log(
        "search keyword before sending API to get events",
        searchKeyword
      );
      const result = await authApi.getEventBySearch(
        currentLocation,
        searchBy,
        searchKeyword,
        searchWhen
      );
      console.log("result from search", result.data); // ได้ event array
      if (!result.data[0]) {
        return alert("no matched event is found");
      }
      // Update eventArray based on event array returned from API
      setEventArray(result.data);
      // Reset search keyword
      setSearchKeyword("");
      setSearchBy("");
      setSearchWhen("");
    } catch (err) {
      console.log("error from api getting event from search", err);
    }
  };

  return (
    <div className="flex gap-2 p-2 w-full bg-white shadow-md rounded-lg min-h-10 text-sm text-graydarktext">
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
      <div className="flex items-center text-graydarktext">|</div>

      {/* Input for the case when user select search by "store" or "product"*/}
      <input
        value={searchKeyword}
        onChange={handleSearchInput}
        className={`grow-1 bg-white ${searchBy == "location" && "hidden"}`}
        type="text"
        placeholder={`${searchBy === "" ? "select search by first" : "Type keyword"}`}
      ></input>

      {/* Google Map PlaceAutocomplete input  Input for the case when user select search by "location"*/}
      <input
        type="text"
        ref={placeAutoCompleteRef}
        className={`grow-1 bg-white ${searchBy !== "location" && "hidden"}`}
        placeholder="Type location"
      />
      <div className="flex items-center text-graydarktext">|</div>
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
      <button type="button" onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
}
