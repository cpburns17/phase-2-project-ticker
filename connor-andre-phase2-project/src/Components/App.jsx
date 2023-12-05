
import React, {useEffect, useState} from "react"
import StockCard from "./StockCard"
import { useOutletContext } from "react-router-dom";

// import {useNavigate} from "react-router-dom"

function App () {

    const {stocks} = useOutletContext()
    

  return (
    <div>
        <StockCard stocks={stocks}/>    
    </div>
  )
}

export default App;
