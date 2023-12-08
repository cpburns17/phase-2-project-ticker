import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
import 'moment';
import 'chartjs-adapter-moment';

function Graph({dataSet, timeAdapter}){

    

    const chartData = {
        labels: timeAdapter,
        datasets: [

            {
                label: 'Stock Price ($)',
                data: dataSet,
                borderColor:  'rgb(198, 42, 7)',
                backgroundColor: 'rgb(196, 68, 39)',
                fill: false,
                pointRadius : 0
            }
        ]
    }

    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price ($)'
                }
            }
        }
    };

    return (
        <Line data={chartData} options={chartOptions} />
    )
}

export default Graph