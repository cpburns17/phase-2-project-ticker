import React, {useState, useEffect} from "react"
import App from "./App"
import "./index.css"

import { useLocation, useNavigate } from "react-router-dom"
import { GoHeartFill } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { FaFire } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti";

import { useOutletContext } from "react-router-dom";




function StockCard () {

    const {stocks} = useOutletContext()

    const {state} = useLocation()

    const [frontCard, setFrontCard] = useState(true)
    const [welcomePage, setWelcomePage] = useState(state ? false : true)
    const [stockData, setStockData] = useState([])
    const [image, setImage] = useState('https://static.dezeen.com/uploads/2017/08/tinder-redesign-graphics_dezeen_sq-1.jpg')
    const [price, setPrice] = useState('')
    const [volume, setVolume] = useState('')
    const [sic, setSic] = useState('')




    function randomStock() {
    const storeTickers = stocks?.map((stock)=>{
        return stock.ticker
    })

    console.log(storeTickers)

    let featuredStock = storeTickers[(Math.floor(Math.random() * storeTickers?.length))];

    fetch(`https://api.polygon.io/v3/reference/tickers/${featuredStock}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setImage(data.results.branding.logo_url)
        setStockData(data.results)
        setSic(data.results.sic_description)

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
            setSic(data.results.sic_description)
            })
        }, [])}

        else{
            useEffect(() => {
                randomStock()
            }, [])
    
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
            market_cap: stockData.market_cap,
            sic_description: sic
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

    const navigate = useNavigate() 

    function handleMetrics () {
        const stockMetrics = {
            name : stockData.name,
            ticker : stockData.ticker,
            price : price,
            image : image,
            home_page_url : stockData.homepage_url,
            market_cap: stockData.market_cap,
            sic_description: sic
        }
        navigate('/stockmetrics', {state: stockMetrics})
    }

return (
<div className="card">  
 
        <div className="stock-profile">
            {frontCard ? (
            <div className="stock-pic">
                <img className="stock-image" alt="card-front" src={`${image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`}  onClick={flipCard}/>
                <div className="stock-details-container">
                <div className="stock-details">
                    <div className="name">
                        <div className="icon">
                            <TiBusinessCard />
                        </div>
                        <span className="stock-name"> {stockData.name} ({stockData.ticker})</span>
                    </div>

                    <div className="sic">
                        <div className="icon"> 
                            <FaRegBuilding/>
                        </div>
                        <span className="stock-sic">{sic}</span>
                    </div>
                    <div className="price">
                        <div className="icon"> 
                            <AiOutlineStock className="icon" />
                        </div>
                        <h2 className="stock-price"> ${price} {stockData.currency_name}</h2>
                    </div>
                </div>
                </div>
            </div> ) 
                
            : (

            <div className="stock-pic">
                <img className="stock-image" alt="card-back" src={`${image}?apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`} onClick={flipCard}/>
                <div className="stock-details">
                    <p className="stock-volume">Volume: ${numberWithCommas(volume)}</p>
                    <p className="stock-cap">Market Cap: ${numberWithCommas(stockData.market_cap)}</p>
                    <p className="stock-bio">About me: {stockData.description}</p>
                    <button className="button-4" onClick={() => handleMetrics(stockData)}>See Company Metrics</button>  
                </div>       
            </div> )}
        </div>
        <div className="buttons">
                <button className="dislike-button" onClick={() => randomStock()} > <RxCross1 className="dislike" /> </button>
                <button className="like-button" onClick={handleLike} > <GoHeartFill className="like"/> </button>
        </div>
</div> 

)
}

export default StockCard;