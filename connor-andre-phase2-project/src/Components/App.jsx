
import React, {useEffect, useState} from "react"
import StockContainer from "./StockContainer"
import SearchBar from "./SearchBar";
import SavedStocks from "./SavedStocks";
import StockCard from "./StockCard";
import './App.css'
import {useNavigate} from "react-router-dom";

function App () {
    const [stocks, setStocks] = useState([])
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();
    // const [search, setSearch] = useState('')


    useEffect(() => {
        fetch('https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNYS&active=true&sort=ticker&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ')
        .then(res => {
            if (res.status === 200){
                res.json()
                .then(data => {
                    console.log(data)
                    setStocks(data.results)
        
                })
            } else {
                res.json()
                .then(data => {
                    console.log(data)
                    setErrors(data)    
                })
            }
         }) 
        //  function handleSearch(search) {
        //     setSearch(
        //        stocks.filter((stock) => stock.name.toLowerCase().includes(search.toLowerCase()))
        //    )}
        //    return handleSearch();
    }, [])

  return (
      <div>
          < Header />
              <SearchBar />
              <button onClick={() => navigate('/savedstocks') }> SavedStocks </button>

          <main>
            {!errors ? 
            <>
              <StockContainer stocks={stocks}/>
              <StockCard stocks={stocks} />
              </> : null}
          </main>
      </div>
  )
}

export default App;
