import React, {useState} from "react"

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


    return (
        <div className="main-pic">
            {frontCard ? (
    <div className="saved-stock">
        <img className="pic" alt="card-front" src={`${stock.image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`}  onClick={flipCard}/>
        <div className="saved-details">
            <h3>{stock.name} ({stock.ticker})</h3>
            <h3>Price: ${stock.price} </h3>
            <button onClick={() => handleDelete(stock)}>Remove from list </button>
        </div>
    </div> ) 
        
    : (

    <div className="saved-stock">
        <img className="pic" alt="card-back" src={`${stock.image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`} onClick={flipCard}/>
        <div className="saved-details">
            <h3>Volume: {stock.volume}</h3>
            <p>TradeHistory: {stock.market_cap}</p>
            <p>{stock.home_page_url}</p>
            <p>Company Bio: {stock.description}</p>  
        </div>       
    </div> )}
        </div>
    )
}

export default Stock;

