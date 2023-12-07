import React, {useEffect, useState} from "react"
import App from './App'
import StockCard from "./StockCard"
import Stock from "./Stock"

// import {useParams} from "react-router-dom"

function SavedStocks (){
    // const paramsc= useParams();
    const [savedStocks, setSavedStocks] = useState([])


    function renderDelete(deleteStock) {
        console.log(deleteStock)
        setSavedStocks(savedStocks.filter((stock) => stock.id != deleteStock.id))
    }



useEffect(() => {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setSavedStocks(data)
    })
}, [])

return (
    <div className="saved-list">
        <h1
        className= "matches"> {savedStocks.map(stock => <Stock stock={stock} renderDelete={renderDelete} />)} 
        </h1>
            
        
    </div>
)
}

export default SavedStocks;