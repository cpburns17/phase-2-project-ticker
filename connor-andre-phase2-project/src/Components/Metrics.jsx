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

    const [financials, setFinancials] = useState([])
    const [graphData, setGraphData] = useState([])

    const {state} = useLocation()
    const id = {
        ticker : state.ticker
    }
    console.log(state)

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/stockdetails', {state:id});
    };

    function handleName() {
        if (state.home_page_url) {
            window.open(state.home_page_url, '_blank');
        }
    }

useEffect(()=>{
    fetch(`https://api.polygon.io/vX/reference/financials?ticker=${state.ticker}&timeframe=annual&limit=2&sort=period_of_report_date&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
    .then((res)=>res.json())
    .then((data)=>{
        setFinancials(data.results)
    })
},[state])


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

    function handleGraph(){
            fetch(`https://api.polygon.io/v2/aggs/ticker/${state.ticker}/range/1/day/${startDate.year}-${startDate.month}-${startDate.day}/${endDate.year}-${endDate.month}-${endDate.day}?adjusted=true&sort=asc&limit=120&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
            .then((res)=>res.json())
            .then((data)=>{
                setGraphData(data.results)
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
        
        console.log(timeAdapter)

    return (
        <div>
        <h1 onClick={handleName}>{state.name}</h1>
        <div>
            
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
        <button onClick={goBack}>Go back</button>
        </div>
    )
}

export default Metrics