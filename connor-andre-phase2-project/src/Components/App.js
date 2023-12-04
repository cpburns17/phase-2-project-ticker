import React, {useEffect, useState} from "react"
import HomePage from "./HomePage"
import SearchBar from "./SearchBar";
import StockCard from "./StockCard";
import SavedStocks from "./SavedStocks";


function App () {

    return (
        <div>
            <header>
                <SearchBar />
            </header>
            <main>
                <HomePage />
                <SavedStocks />
                <StockCard />
            </main>
        </div>
    )
}

export default App;