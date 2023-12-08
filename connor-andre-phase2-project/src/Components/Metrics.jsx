import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
import Graph from "./Graph";

function Metrics(){
    

    const [startDate, setStartDate] = useState({
        day: '',
        month: '',
        year: ''
    })

    const [endDate, setEndDate] = useState({
        day: '',
        month: '',
        year: ''
    })

    const [financials_2023, setFinancials_2023] = useState([])
    const [financials_2022, setFinancials_2022] = useState([])
    const [graphData, setGraphData] = useState([])
    const [fetcher,setFetcher] = useState(true)

    const {state} = useLocation()
    const id = {
        ticker : state.ticker
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/stockdetails', {state:id});
    };

    function handleName() {
        if (state.home_page_url) {
            window.open(state.home_page_url, '_blank');
        }
    }

    function fetchFinancials (nextUrl){
        if(nextUrl){
            fetch()
        }
    }

useEffect(()=>{
    fetch(`https://api.polygon.io/vX/reference/financials?ticker=${state.ticker}&timeframe=annual&limit=2&sort=period_of_report_date&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data.results)
        setFinancials_2023(data.results[0].financials)
        setFinancials_2022(data.results[1].financials)
    })
},[fetcher])

console.log(financials_2022)


    function handleSelectDates(x) {
        if(x === 'days') {
            const n = 31;
            const options = [];
            for(let i = 1; i <= n; i++) {
                if(i<10){
                    options.push(<option value={`0${i}`} key={i}>0{i}</option>);
                } else {
                    options.push(<option value={i} key={i}>{i}</option>);
                }
            }
            return options
        } else if (x==='months') {
            const n =12
            const options = [];
            for(let i = 1; i <= n; i++) {
                if(i<10){
                    options.push(<option value={`0${i}`} key={i}>0{i}</option>);
                } else {
                    options.push(<option value={i} key={i}>{i}</option>)
                }
            }
            return options
        } else if(x==='years') {
            const n= (new Date().getFullYear())
            const options = []
            for(let i = 2018; i <= n; i++) {
                options.push(<option key={i}>{i}</option>);
            }
            return options;
    }  
    }

    function handleOnChangeStart(e){
        setStartDate({...startDate,
            [e.target.name] : e.target.value
        })
    }

    function handleOnChangeEnd(e){
        setEndDate({...endDate,
            [e.target.name] : e.target.value
        })
    }

    function handleFetch(nextUrl){
        fetch(nextUrl + `&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.next_url){
                console.log(data)
                setGraphData((prevState) => {

                    let array1 = prevState
                    let array2 = data.results

                    const newArr = array1.concat(array2)

                    return newArr
                } )
                handleFetch(data.next_url)
            } else {
                setGraphData((prevState) => {

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

    function handleGraph(){
            fetch(`https://api.polygon.io/v2/aggs/ticker/${state.ticker}/range/1/day/${startDate.year}-${startDate.month}-${startDate.day}/${endDate.year}-${endDate.month}-${endDate.day}?adjusted=true&sort=asc&limit=120&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
            .then((res)=>res.json())
            .then((data)=>{
                if(data.next_url){
                    setGraphData(data.results)
                    handleFetch(data.next_url)
                } else {
                    console.log(data)
                    setGraphData(data.results) 
                }
            })
        }

        const dataSet = graphData.map(closePrice=>{
            return closePrice.c
        })

        const timeAdapter = graphData.map((data)=>{
            const timeStamp = new Date(data.t)
            const formattedTime = `${timeStamp.getFullYear()}-${(timeStamp.getMonth()+1).toString().padStart(2, '0')}-${timeStamp.getDate().toString().padStart(2, '0')}`
            return formattedTime
        })

    return (
        <div className="metrics-container">
            <h1 className="metrics" >{state.name}</h1>
            <p className="click-website"onClick={handleName}> Visit Website</p>
            <div className="graph-stuff">
                
            <p>Select Start Date</p>
            <select onChange={handleOnChangeStart} value={startDate.day} name="day">
                <option value="" disabled selected hidden>DD</option>
                {handleSelectDates('days')}
            </select>
            <select onChange={handleOnChangeStart} value={startDate.month} name='month'>
                <option value="" disabled selected hidden>MM</option>
                {handleSelectDates('months')} 
            </select>
            <select onChange={handleOnChangeStart} value={startDate.year} name='year'>
                <option value="" disabled selected hidden>YYYY</option>
                {handleSelectDates('years')}
            </select>
            <div>
            <p>Select End Date</p>
            <select onChange={handleOnChangeEnd} value={endDate.day} name="day">
                <option value="" disabled selected hidden>DD</option>
                {handleSelectDates('days')}
            </select>
            <select onChange={handleOnChangeEnd} value={endDate.month} name='month'>
                <option value="" disabled selected hidden>MM</option>
                {handleSelectDates('months')} 
            </select>
            <select onChange={handleOnChangeEnd} value={endDate.year} name='year'>
                <option value="" disabled selected hidden>YYYY</option>
                {handleSelectDates('years')}
            </select>
            </div>
            <div>
                <button onClick={handleGraph}>Create Graph</button>
            </div>
            <div>
                <Graph timeAdapter={timeAdapter} dataSet={dataSet}/>
            </div>
            </div>
            <button className="back-button" onClick={goBack}>Go back</button>
        </div>
    )
}

export default Metrics