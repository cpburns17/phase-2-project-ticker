import React, {useState, useEffect} from "react"
import App from "./App"
import "./index.css"

import { useLocation } from "react-router-dom"
import { GoHeartFill } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";




function StockCard ({stocks}) {

    const {state} = useLocation()

    const [frontCard, setFrontCard] = useState(true)
    const [welcomePage, setWelcomePage] = useState(state ? false : true)
    const [stockData, setStockData] = useState([])
    const [image, setImage] = useState('https://static.dezeen.com/uploads/2017/08/tinder-redesign-graphics_dezeen_sq-1.jpg')
    const [price, setPrice] = useState('')
    const [volume, setVolume] = useState('')




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

        fetch(`https://api.polygon.io/v1/open-close/${data.results.ticker}/2023-12-04?adjusted=true&apiKey=15QmMowx5gfJE_p1AL_gGzjGQm9kfYtr`)
        .then(res=> res.json())
        .then(data => {
            console.log(data)
            setPrice(data.close)
            setVolume(data.volume)
        });
    })

    
    }

        if(state){
        useEffect(() => {


            fetch(`https://api.polygon.io/v1/open-close/${state.ticker}/2023-12-04?adjusted=true&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
            .then(res=> res.json())
            .then(data => {
                console.log(data)
                setPrice(data.close)
                setVolume(data.volume)
            }) 

            fetch(`https://api.polygon.io/v3/reference/tickers/${state.ticker}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
            .then(res => res.json())
    .then(data => {
        console.log(data)
        setImage(data.results.branding.logo_url)
        setStockData(data.results)
    })
        }, [])}

     
    function renderWelcome () {
        setWelcomePage(!welcomePage)
        randomStock()

    }

    function flipCard () {
        setFrontCard(!frontCard)
    }

    function handleLike(){

        const likedStock = {
            name : stockData.name,
            ticker : stockData.ticker,
            price : price,
            volume : volume,
            description : stockData.description,
            image : image,
            home_page_url : stockData.homepage_url,
            market_cap: stockData.market_cap
        }

        fetch('http://localhost:3000/stocks',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(likedStock)
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setSavedStocks(data)

        })
        randomStock()
    }



return (
<div className="card">  
    {welcomePage ? (
        <div className="stock-welcome">
                <img alt="card-welcome" src={'https://static.dezeen.com/uploads/2017/08/tinder-redesign-graphics_dezeen_sq-1.jpg'}  />
            <div className="stock-welcome-info">
                <h2>Welcome to Ticker!</h2>
                <h2>The #1 Stock Matchmaker</h2>
                <h2></h2>
                <p>Instructions:
                    Everytime you click - you'll be matched with a new, random stock. Click on the stock picture to see detailed information about the stocks trade history, trade volume, and company information. If you want to invest in this stock, click the likes button to add it to your "Matches" list. 
                    Looking for a specific stock in particular? Use the "Search" bar to search by the company's ticker symbol.
                    
                    To get started, click below!
                </p>
                <button onClick={renderWelcome}>Begin!</button>
            </div>
        </div>
    ) : (    
        <div className="stock-profile">
            {frontCard ? (
            <div className="stock-pic">
                <img alt="card-front" src={`${image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`}  onClick={flipCard}/>
                <div className="stock-details">
                    <h2 className="stock-name">{stockData.name} ({stockData.ticker})</h2>
                    <h2>Price: ${price} {stockData.currency_name}</h2>
                </div>
            </div> ) 
                
            : (

            <div className="stock-pic">
                <img alt="card-back" src={`${image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`} onClick={flipCard}/>
                <div className="stock-details">
                    <p>Volume: {volume}</p>
                    <p>TradeHistory</p>
                    <p>Company Bio: {stockData.description}</p>  
                </div>       
            </div> )}

            <div className="buttons">
                <button onClick={() => randomStock()} className="dislike"> <RxCross1 /> </button>
                <button onClick={handleLike} className="like"> <GoHeartFill color="rgb(24, 204, 114)" /> </button>
                

            </div>
        </div>) }
</div> 
)
}

export default StockCard;