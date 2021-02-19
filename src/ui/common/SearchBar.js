import React, { useEffect } from 'react';

import SearchBar from "material-ui-search-bar";
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox =  ({ currentRefinement, isSearchStalled, refine }) => {
  const handleOnChange = (e, text) => {
    refine(text);
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

