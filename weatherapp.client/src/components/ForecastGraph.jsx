import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useWeather } from '../context/WeatherContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const TemperatureGraph = () => {
    const { weeklyWeather } = useWeather();

    function formatUnixTimestamp(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        //console.log(date);

        var convertedDate = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        });
        //console.log(convertedDate);

        return convertedDate;
    }

    const chartData = {
        labels: weeklyWeather.list.map(item => formatUnixTimestamp(item.dt)),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weeklyWeather.list.map(item => item.main.temp),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.5,
                datalabels: {
                    color: 'white',
                    align: 'top',
                    offset: 5,
                    formatter: function (value) {
                        return Math.round(value);
                    }
                },
                yAxisID: 'ytemp',
            },
            {
                label: 'Rain (mL)',
                data: weeklyWeather.list.map(item => item.rain?.['3h'] ?? 0.0),
                fill: false,
                backgroundColor: 'rgb(80, 160, 255)',
                borderColor: 'rgba(80, 160, 255, 0.2)',
                tension: 0.5,
                datalabels: {
                    display: false,
                    color: 'white',
                    align: 'top',
                    offset: 5
                },
                yAxisID: 'yrain',
            },
            {
                label: 'Clouds (%)',
                data: weeklyWeather.list.map(item => item.clouds?.['all'] ?? 0.0),
                fill: false,
                backgroundColor: 'rgba(160, 160, 160, 0.2)',
                borderColor: 'rgba(160, 160, 160, 0.1)',
                tension: 0.5,
                datalabels: {
                    display: false,
                    color: 'white',
                    align: 'top',
                    offset: 5
                },
                yAxisID: 'ycloud',
            }

        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Forecast',
            }
        },
        scales: {
            ytemp: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                },
                beginAtZero: false,
            },
            ycloud: {
                type: 'linear',
                display: false,
                position: 'right',
                title: {
                    display: true,
                    text: 'Clouds (%)'
                },
                beginAtZero: false,
            },
            yrain: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Rain (mL)'
                },
                suggestedMax: 5, // arbitrary, should change
                grid: {
                    drawOnChartArea: false,
                },
                beginAtZero: true,
            },
            x: {
                title: {
                    display: true,
                    text: 'Time of Day'
                }
            }
        }
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TemperatureGraph;
