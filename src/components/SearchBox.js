import React, { useContext } from "react";
import Search from "antd/es/input/Search";
import { SearchContext } from "../App";
import { searchProductByName } from "../utils";

function SearchBox() {
  const { setSearchResults } = useContext(SearchContext);

  const handleSearch = async (value) => {
    console.log("Search Value:", value);

    const results = await searchProductByName(value);

    setSearchResults(results);
  };

  return (
    <Search
      placeholder="Search..."
      onSearch={handleSearch}
      style={{ width: "40%", minWidth: "300px" }}
    />
  );
}
export default SearchBox;
