import React, {useState} from "react"
import { useOutletContext } from "react-router-dom"


function Stock ({stock, renderDelete}) {
    const [frontCard, setFrontCard] = useState(true)

    function handleDelete (stock) {
        fetch(`http://localhost:3000/stocks/${stock.id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderDelete(stock)
        })
    }

    function flipCard () {
        setFrontCard(!frontCard)
    }

    function numberWithCommas(x) {
        Math.ceil(x * 100) / 100
        if(x/1000 < 1000){
            return `${Math.ceil(((x/1000).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))*1000)/1000}k`
        } else if(x/1000000 < 1000){
            return `${Math.ceil(((x/1000000).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))*1000)/1000}m`
        } else if (x/1000000000 < 1000) {
            return `${Math.ceil(((x/1000000000).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))*1000)/1000}b`  
        } else if (x/1000000000000 < 1000){
            return `${Math.ceil(((x/1000000000000).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))*1000)/1000}t`
        }
    }


    return (
    <div className="main-pic">
            {frontCard ? (
        <div className="saved-stock">
            <img className="saved-pic" alt="card-front" src={`${stock.image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`}  onClick={flipCard}/>
            <div className="saved-details">
                <h3 className="stock-name">{stock.name} ({stock.ticker})</h3>
                <h3 className="stock-sic">{stock.sic}</h3>
                <h3 className="stock-price">Price: ${stock.price} </h3>
                <button className="remove-stock"onClick={() => handleDelete(stock)}>Remove from list </button>
            </div>
        </div> ) 
        
    : (

        <div className="saved-stock">
            <img className="saved-pic" alt="card-back" src={`${stock.image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`} onClick={flipCard}/>
            <div className="saved-details">
                <h3 className="stock-volume">Volume: ${numberWithCommas(stock.volume)}</h3>
                <p>Market Cap: ${numberWithCommas(stock.market_cap)}</p>
                <p className="saved-about"><strong>About me: </strong> {stock.description}</p> 
            </div>       
        </div> )}
    </div>
    )
}

export default Stock;

