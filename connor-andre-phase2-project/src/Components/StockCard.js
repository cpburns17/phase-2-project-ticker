import React from "react"
import App from "./App"

function StockCard () {


return (
    <div>
        <div>
            StockFront
                StockImage
                Name
                Ticker
                Price
        </div>
        <div>
            StockBack
                TradeVolume
                TradeHistory
                CompanyInfo
        </div>
        <div>
            <button> Like Button </button>
            <button> Dislike Button </button>
        </div>
    </div>
)
}

export default StockCard;