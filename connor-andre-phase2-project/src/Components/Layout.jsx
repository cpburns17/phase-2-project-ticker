
import Header from "./Header";
import {Outlet} from "react-router-dom"
import {useState, useEffect} from "react"



function Layout () {
    const [stocks, setStocks] = useState([])
    const [errors, setErrors] = useState(null)
    const [search, setSearch] = useState("")



    useEffect(() => {
        fetch('https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNYS&active=true&limit=1000&sort=ticker&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ')
        .then(res => {
            if (res.status === 200){
                res.json()
                .then(data => {
                    console.log(data)
                    setStocks(data.results)
                }).then(
                    fetch ('https://api.polygon.io/v3/reference/tickers?cursor=YWN0aXZlPXRydWUmYXA9TFRIJTdDMjEwN2ZhOTljZTIzMGJiZGYzMzhmZDNmM2MwMzY2NmRkOTExZTNhNjQ3MjgwMTk2ZTY1MGYxMTA1MWYwYWQ3NCZhcz0mZGF0ZT0yMDIzLTEyLTA1JmV4Y2hhbmdlPVhOWVMmbGltaXQ9MTAwMCZtYXJrZXQ9c3RvY2tzJm9yZGVyPWFzYyZzb3J0PXRpY2tlciZ0eXBlPUNT&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ')
                    .then((res)=>res.json())
                    .then((data)=>{
                            console.log(data)
                            setStocks((prevState) => {

                                let array1 = prevState
                                let array2 = data.results

                                const newArr = array1.concat(array2)

                                console.log(newArr)
                                return newArr
                            } )

                    })
                )
            } else {
                res.json()
                .then(data => {
                    console.log(data)
                    setErrors(data)
                })
            }
        })

    }, [])

    const cleanArray = [new Set(stocks)]
    
    function handleSearch(searchTerm){
        setSearch(searchTerm)
    }

    const filteredStocks = search.trim() === ""
    ? []
    : stocks.filter(stock => stock.ticker.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
        < Header />
        <div className="main">
            <Outlet context={{stocks, setStocks, handleSearch, filteredStocks, search} }/>
        </div>
    </>
  )
}

export default Layout;
