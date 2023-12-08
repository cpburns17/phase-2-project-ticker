
import Header from "./Header";
import {Outlet} from "react-router-dom"
import {useState, useEffect} from "react"



function Layout () {
    const [stocks, setStocks] = useState([])
    const [errors, setErrors] = useState(null)
    const [search, setSearch] = useState("")



    function handleFetch(nextUrl){
        fetch(nextUrl + `&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.next_url){
                console.log(data)
                setStocks((prevState) => {

                    let array1 = prevState
                    let array2 = data.results

                    const newArr = array1.concat(array2)

                    return newArr
                } )
                handleFetch(data.next_url)
            } else {
                setStocks((prevState) => {

                    let array1 = prevState
                    let array2 = data.results

                    const newArr = array1.concat(array2)

                    console.log(newArr)
                    return newArr
                } )
                console.log(data)

            }
            
        })
    }


    useEffect(() => {
        fetch('https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNYS&active=true&limit=1000&sort=ticker&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ')
        .then(res => {
            if (res.status === 200){
                res.json()
                .then((data)=>{
                    if(data.next_url){
                        console.log(data)
                        setStocks(data.results)
                        handleFetch(data.next_url)  
                    } else {
                        setStocks(data.results)
                    }

                })
            } else {
                res.json()
                .then(data => {
                    console.log(data)
                    setErrors(data)
                })
            }
        })

    }, [])

    
    
    function handleSearch(searchTerm){
        setSearch(searchTerm)
    }

    const filteredStocks = search.trim() === ""
    ? []
    : stocks.filter(stock => stock.ticker.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
    {/* <h1 className="ticker">
        Ticker
    </h1> */}
        < Header />
        <div className="main">
            <Outlet context={{stocks, setStocks, handleSearch, filteredStocks, search} }/>
        </div>
    </>
  )
}

export default Layout;
