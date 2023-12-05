import React, {useState, useEffect} from "react"
import App from "./App"
import StockContainer from "./StockContainer"

function StockCard ({stocks}) {
    const [frontCard, setFrontCard] = useState(true)
    const [stockData, setStockData] = useState([])
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')

    function randomStock() {
    const storeTickers = stocks?.map((stock)=>{
        return stock.ticker
    })

    let featuredStock = storeTickers[(Math.floor(Math.random() * storeTickers?.length))];

    fetch(`https://api.polygon.io/v3/reference/tickers/${featuredStock}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setImage(data.results.branding.logo_url)
        setStockData(data.results)
    })
    }

    useEffect(() => {
        fetch(`https://api.polygon.io/v1/open-close/${stockData.ticker}/2023-12-04?adjusted=true&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
        .then(res=> res.json())
        .then(data => {
            console.log(data)
            setPrice(data)
        })
    }, [stockData])
   

    function flipCard () {
        setFrontCard(!frontCard)
    }

return (
    <div>
        {frontCard ? (
        <div className="stock-pic">
            <img alt="card-front" src={`${image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`}  onClick={flipCard}/>
            <div className="stock-info">
                <h2>{stockData.name}</h2>
                <h2>{stockData.ticker}</h2>
                <h2>Price: ${price.close} {stockData.currency_name}</h2>
                <p>Description {stockData.description}</p>
            </div>
        </div> ) 
        : (
        <div className="stock-pic">
            <img alt="card-back" src={`${image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`} onClick={flipCard}/>
            <div className="stock-info">
                <p>Volume: {price.volume}</p>
                <p>TradeHistory</p>
                <p>CompanyInfo</p>    
            </div>       
        </div> )}

        <div className="likes">
            <button onClick={() => randomStock()}> Dislike Button </button>
            <button> Like Button </button>
        </div>
    </div>
)
}

export default StockCard;