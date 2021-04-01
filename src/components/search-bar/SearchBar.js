import React from 'react';

import SearchBar from "material-ui-search-bar";
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
  const handleOnChange = (e) => {
    e.preventDefault();

    const value = e.target.value;
    refine(value);
  }

  return (
    <SearchBar
      placeholder="Search certified personal trainers"
      value={currentRefinement}
      onChange={handleOnChange}
    />
  )
}

const CustomSearchBox = connectSearchBox(SearchBox)

export default CustomSearchBox;

