import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Annotation from 'chartjs-plugin-annotation';
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
    ChartDataLabels,
    Annotation
);

const TemperatureGraph = () => {
    const { weeklyWeather } = useWeather();
    const [showAnnotations, setShowAnnotations] = useState(true);
    const [showDatapoints, setShowDatapoints] = useState(true);
    const [selectedRange, setSelectedRange] = useState('1');

    // Button management
    const handleRangeChange = range => setSelectedRange(range);
    const isSelected = range => selectedRange === range ? 'selected' : '';

    const getDataSlice = (data) => {
        switch (selectedRange) {
            case '1':
                return data.slice(0, 9);
            case '2':
                return data.slice(8, 17);
            case '3':
                return data.slice(16, 25);
            case '4':
                return data.slice(24, 33);
            case '5':
                return data.slice(32, 41);
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

        return convertedDate;
    }

    function getNextFiveWeekdays(unixTimestamp) {
        const weekdays = [];
        const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

        for (let i = 0; i < 5; i++) {
            // Get the localized weekday name
            weekdays.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            date.setDate(date.getDate() + 1); // Move to the next day
        }

        return weekdays;
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
                    },
                    display: showDatapoints
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
            },
            annotation: showAnnotations ? {
                annotations: weeklyWeather.list.reduce((acc, item, index, array) => {
                    if (index > 0 && new Date(item.dt * 1000).getDate() !== new Date(array[index - 1].dt * 1000).getDate()) {
                        acc[`line-${index}`] = {
                            type: 'line',
                            xMin: index,
                            xMax: index,
                            borderColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 3,
                        };

                        /*
                        console.log(acc);
                        console.log(`line-${index}`);
                        console.log(acc[`line-${index}`]);
                        */

                        if (acc[`line-${index}`] && index > 0) {
                            const prevDate = new Date(array[index - 1].dt * 1000);
                            prevDate.setDate(prevDate.getDate() + (selectedRange == "all" ? 1 : parseInt(selectedRange)));
                            acc[`text-${index}`] = {
                                type: 'label',
                                xMin: (acc[`line-${index}`].xMin + index) / 2,
                                xMax: (acc[`line-${index}`].xMin + index) / 2,
                                yMin: '50%',
                                yMax: '50%',
                                content: prevDate.toLocaleDateString('en-US', { weekday: 'short' }),
                                color: 'rgba(255, 99, 132, 0.8)',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                            };
                        }
                    }
                    return acc;
                }, {}),
            } : {},
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

    var NextFiveWeekdays = getNextFiveWeekdays(weeklyWeather.list[0].dt);

    return (
        <div>
            <div className="chart-range-buttons" style={{ margin: 15 }}>
                {['1', '2', '3', '4', '5', 'all'].map((range, index) => (
                    <button key={range} style={{ margin: 0, width: 50 }} className={isSelected(range)} onClick={() => handleRangeChange(range)}>
                        {range !== 'all' ? `${NextFiveWeekdays[index]}` : 'All'}
                    </button>
                ))}
                <button onClick={() => setShowDatapoints(!showDatapoints)} className={showDatapoints ? 'selected' : ''}>
                    Labels
                </button>
                <button onClick={() => setShowAnnotations(!showAnnotations)} className={showAnnotations ? 'selected' : ''}>
                    Dividers
                </button>
            </div>
            <div className="chart-wrapper">
                <Line data={chartData} options={options} className="chart-container" />
            </div>
        </div>
    );
};

export default TemperatureGraph;