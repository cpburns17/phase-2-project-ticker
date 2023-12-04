
import React, {useEffect, useState} from "react"
import StockContainer from "./StockContainer"
import SearchBar from "./SearchBar";
import SavedStocks from "./SavedStocks";
import StockCard from "./StockCard";
import './App.css'

function App () {
    const [stocks, setStocks] = useState([])
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        fetch('https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNYS&active=true&limit=1000&sort=ticker&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ')
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
    }, [])

  return (
      <div>
          <header>
              <SearchBar />
          </header>
          <main>
            {!errors ? 
            <>
              <StockContainer stocks={stocks}/>
              <StockCard stocks={stocks} />
              <SavedStocks />
              </> : null}
          </main>
      </div>
  )
}

export default App;
