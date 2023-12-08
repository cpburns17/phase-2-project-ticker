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
                <p className="instructions-title">Instructions: </p>
                <p className="instructions"> Every time you swipe, you’ll be matched with a new, random stock. Tap the stock picture to see company information and metrics such as trading volume and history.</p>
                <p className="instructions">  Swipe right to save a stock to your “Matches” list. You can revist your saved stock at any time and even open them in your Robinhood or Etrade account. </p>
                <p className="instructions">Not interested? Swipe left to move onto a new stock. Looking for a specific stock? Click on the search icon to search by the company’s ticker symbol. </p>
                <p className="instructions">Click below to get started!</p>

                <button className="button-5"onClick={handleClick}> Start</button>
            </div>
    </div>
)
}

export default WelcomePage;