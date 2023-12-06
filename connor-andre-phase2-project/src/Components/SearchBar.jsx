import React, {useState} from "react"
import App from "./App"
import { useOutletContext, useNavigate } from "react-router-dom";

function SearchBar () {
    const {search} = useOutletContext()
    const {handleSearch} = useOutletContext()
    const {filteredStocks} = useOutletContext()
    
    const navigate = useNavigate() 

    function handleClick (stock) {
        navigate('/stockdetails', {state: stock})
    }

    function handleSearchChange(e){
        handleSearch(e.target.value)
    }

    const listSearch = filteredStocks.map((stock)=>{
        return <div>
            <h1 onClick={() => handleClick(stock)}>{stock.ticker}</h1>
        </div>
    })
    
    
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
            {listSearch}
        </div>
    )
    }
export default SearchBar;