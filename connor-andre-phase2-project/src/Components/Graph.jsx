import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
import { useEffect, useState } from "react"
import 'moment';
import 'chartjs-adapter-moment';

function Graph({dataSet, timeAdapter}){

    

    const chartData = {
        labels: timeAdapter,
        datasets: [

            {
                label: 'Stock Price ($)',
                data: dataSet,
                borderColor: 'blue',
                backgroundColor: 'lightblue',
                fill: false,
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