import React, {useState, useEffect} from "react"
import App from "./App"
import "./index.css"
import { useNavigate } from "react-router-dom";

function WelcomePage() {
    const navigate = useNavigate() 


    function handleClick () {
        navigate('/stockdetails')
        
    }

return (
    <div className="stock-welcome">
        <img alt="card-welcome" src={'https://static.dezeen.com/uploads/2017/08/tinder-redesign-graphics_dezeen_sq-1.jpg'}  />
            <div className="stock-welcome-info">
                <h4>Welcome to Ticker!</h4>
                <h4 className="welcome-line2">The #1 Stock Matchmaker</h4>
                <p className="instructions">Instructions:
                    Everytime you click - you'll be matched with a new, random stock. Click on the stock picture to see detailed information about the stocks trade history, trade volume, and company information. If you want to invest in this stock, click the likes button to add it to your "Matches" list. 
                    Looking for a specific stock in particular? Use the "Search" bar to search by the company's ticker symbol.
                    
                    To get started, click below!
                </p>
                <button className="button-5"onClick={handleClick}> Begin </button>
            </div>
    </div>
)
}

export default WelcomePage;