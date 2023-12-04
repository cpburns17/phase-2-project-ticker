import React, {useState, useEffect} from "react"
import App from "./App"
import StockContainer from "./StockContainer"

function StockCard ({stocks}) {
    const [frontCard, setFrontCard] = useState(true)
    const [stockData, setStockData] = useState([])


    function randomStock(){
        const storeTickers = stocks?.map((stock)=>{
            return stock.ticker
        })

        let featuredStock = storeTickers[(Math.floor(Math.random() * storeTickers?.length))];
    
    useEffect(() => {
        fetch(`https://api.polygon.io/v3/reference/tickers/${featuredStock}?type=CS&market=stocks&exchange=XNYS&active=true&limit=1000&sort=ticker&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setStockData(data)
        })
    }, [])

    }

    randomStock()

    function flipCard () {
        setFrontCard(!frontCard)
    }


return (
    <div>
        {frontCard ? (
        <div className="front-card">
            <img alt="card-front" src={""} onClick={flipCard}/>
            <div className="stock-info">
                <h2>Company Name</h2>
                <h2></h2>
                <h2>Price</h2>
            </div>
        </div> ) 
        : (
        <div className="back-card">
            <img alt="card-back" src={""} onClick={flipCard}/>
            <div className="stock-info">
                <p>TradeVolume</p>
                <p>TradeHistory</p>
                <p>CompanyInfo</p>    
            </div>       
        </div> )}

        <div>
            <button> Dislike Button </button>
            <button> Like Button </button>
        </div>
    </div>
)
}

export default StockCard;