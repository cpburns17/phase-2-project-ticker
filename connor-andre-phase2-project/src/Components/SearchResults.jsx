import React from "react";
import App from "./App"
import SearchBar from "./SearchBar"

function SearchResults({search, handleSearch}) {

    function handleSearchChange(e){
        handleSearch(e.target.value)
    }

return (
    <div>
        <div className="company search">
            <input 
            onChange={handleSearchChange}
            className="prompt"
            placeholder="Search by company name"
            value={search}
            />
            <i className="search box" />
        </div>
    </div>
)
}

export default SearchResults;