import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

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

function getDates() {
const today = new Date();
const yearToday = today.getFullYear();
const monthToday = String(today.getMonth() + 1).padStart(2, '0');
const dayToday = String(today.getDate()).padStart(2, '0');

const formattedToday = `${yearToday}-${monthToday}-${dayToday}`;

const date7DaysAgo = new Date(today);
date7DaysAgo.setDate(today.getDate() - 6);
const year7DaysAgo = date7DaysAgo.getFullYear();
const month7DaysAgo = String(date7DaysAgo.getMonth() + 1).padStart(2, '0');
const day7DaysAgo = String(date7DaysAgo.getDate()).padStart(2, '0');

const formatted7DaysAgo = `${year7DaysAgo}-${month7DaysAgo}-${day7DaysAgo}`;

return { today: formattedToday, lastWeek: formatted7DaysAgo, year: yearToday, lastyear: yearToday-1};
}

if(state){
fetch(`https://api.polygon.io/v2/aggs/ticker/${state.ticker}/range/1/day/${getDates().lastWeek}/${getDates().today}?adjusted=true&sort=asc&limit=120&apiKey=vIx3B06AYjzS_w8q9C8UOpoWUeVqpplQ`)
.then((res)=>res.json())
.then((data)=>{
    console.log(data.results)
})
}


function handleSelectDates(x) {
    if(x === 'days') {
        const n = 31;
        const options = [];
        for(let i = 1; i <= n; i++) {
            options.push(<option key={i}>{i}</option>);
        }
        return options
    } else if (x==='months') {
        const n =12
        const options = [];
        for(let i = 1; i <= n; i++) {
            options.push(<option key={i}>{i}</option>);
        }
        return options
    } else if(x==='years') {
        const n= getDates().year
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

return (
<div>
    <div className="metrics-container">
    <h1 className="metrics">{state.name}</h1>
        <p className="click-website"onClick={handleName}> Visit Website</p>
    <div>
        
    <p>Select Start Date</p>
    <select onChange={handleOnChangeStart} value={startDate.day} name="day">
        {handleSelectDates('days')}
    </select>
    <select onChange={handleOnChangeStart} value={startDate.month} name='month'>
        {handleSelectDates('months')} 
    </select>
    <select onChange={handleOnChangeStart} value={startDate.year} name='year'>
        {handleSelectDates('years')}
    </select>
    <div>
    <p>Select End Date</p>
    <select onChange={handleOnChangeEnd} value={endDate.day} name="day">
        {handleSelectDates('days')}
    </select>
    <select onChange={handleOnChangeEnd} value={endDate.month} name='month'>
        {handleSelectDates('months')} 
    </select>
    <select onChange={handleOnChangeEnd} value={endDate.year} name='year'>
        {handleSelectDates('years')}
    </select>
    </div>
    </div>

    <button className="back-button" onClick={goBack}>Go back</button>
    </div>
</div>
)
}

export default Metrics