import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useWeather } from '../context/WeatherContext';
import './ForecastGraph.css';

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

    // Button management
    const [selectedRange, setSelectedRange] = useState('first8');

    const handleRangeChange = (range) => {
        setSelectedRange(range);
    };

    const isSelected = (range) => {
        return selectedRange === range ? 'selected' : '';
    };

    const getDataSlice = (data) => {
        switch (selectedRange) {
            case 'first8':
                return data.slice(0, 8);
            case 'first24':
                return data.slice(0, 24);
            case 'all':
                return data;
            default:
                return data;
        }
    };

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
        labels: getDataSlice(weeklyWeather.list.map(item => formatUnixTimestamp(item.dt))),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: getDataSlice(weeklyWeather.list.map(item => item.main.temp)),
                fill: false,
                backgroundColor: 'rgb(255, 205, 132)',
                borderColor: 'rgba(255, 205, 132, 0.2)',
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
                data: getDataSlice(weeklyWeather.list.map(item => item.rain?.['3h'] ?? 0.0)),
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
                data: getDataSlice(weeklyWeather.list.map(item => item.clouds?.['all'] ?? 0.0)),
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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: false,
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
                    display: false,
                    text: 'Time of Day'
                }
            },
        }
    };

    return (
        <div>
            <div className="chart-range-buttons" style={{ margin: 5 }}>
                <button
                    style={{ margin: 5 }}
                    className={isSelected('first8')}
                    onClick={() => handleRangeChange('first8')}
                >
                    1 Day
                </button>
                <button
                    style={{ margin: 5 }}
                    className={isSelected('first24')}
                    onClick={() => handleRangeChange('first24')}
                >
                    3 Days
                </button>
                <button
                    style={{ margin: 5 }}
                    className={isSelected('all')}
                    onClick={() => handleRangeChange('all')}
                >
                    5 Days
                </button>
            </div>
            <div className="chart-wrapper">
                <Line data={chartData} options={options} className="chart-container" />
            </div>
        </div>
    );
};

export default TemperatureGraph;