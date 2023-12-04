import React from "react"
import App from "./App"
import SearchResults from "./SearchResults";

function SearchBar () {

return (
    <div>
        <div className="company search">
            <input 
            className="prompt"
            placeholder="Search by company name"
            value=""
            />
            <i className="search box" />
        </div>
        <SearchResults />
    </div>
)
}

export default SearchBar;