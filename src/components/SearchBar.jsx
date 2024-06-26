import React from "react";

export default function SearchBar() {
  return (
    <form>
        <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
    <input
      className="w-100 h-9 bg-white"
      type="text"
      placeholder="Search"
    ></input>
    </form>
  );
}
