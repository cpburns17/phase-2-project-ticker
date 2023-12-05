import React, {useState} from "react"
import App from "./App"
import SearchResults from "./SearchResults";

function SearchBar ({handleSearch, search}) {
//     const [searchText, setSearchText] = useState('')

// handleSearch(searchText)

return (
    <div>
        <div className="company search">
            <input 
            className="prompt"
            placeholder="Search by company name"
            // value={searchText}
            // onChange={() => setSearchText(e.target.value)} 
            />
            <i className="search box" />
        </div>
        <SearchResults search={search}/>
    </div>
)
}

export default SearchBar;