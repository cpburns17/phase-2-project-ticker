import { useLocation, useNavigate } from "react-router-dom"

function Metrics(){

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

return (
    <div>
    <h1 onClick={handleName}>{state.name}</h1>
    <button onClick={goBack}>Go back</button>
    </div>
)
}

export default Metrics