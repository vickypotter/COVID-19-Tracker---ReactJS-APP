import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import './LineGraph.css';

const options = {
    legend : {
        display : false,
    },
    elements :{
        points : {
            radius : 0,
        },
    },
    maintainAspectRatio : false,
    tooltips : {
        mode : "index",
        intersect : false,
        callbacks : {
            label : function (tooltipItem,data)
            {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales : {
        xAxes : [
            {
                type : "time",
                time : {
                    format : "MM/DD/YY",
                    tooltipFormat:"ll",
                },
            },
        ],
        yAxes : [
            {
                gridLines : {
                    display : false,
                },
                ticks : {
                    callback : function (value, index, values)
                    {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

function LineGraph({ casesType = 'cases', ...props}) 
{
    const [data, setData] = useState({});

    const buildChartDate = (data, casesType) => {
        const chartData = [];
        let lastDatapoint;
        for(let date in data.cases) 
        {
            if(lastDatapoint)
            {
                const newDatapoint = {
                    x : date,
                    y :data[casesType][date] - lastDatapoint
                };
                chartData.push(newDatapoint);
            }
            lastDatapoint = data[casesType][date];
        }
        return chartData;
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
                .then(response => response.json())
                .then(data => {
                    const chartData = buildChartDate(data, casesType);
                    setData(chartData);             
                });
        }

        fetchData();
    },[casesType]);

    

    return (
        <div className={props.className}>
            {
                data?.length > 0 &&(
                    <Line 
                        options = {options}
                        data = {{
                            datasets : [
                                {
                                    data:data,
                                    borderColor: '#4A235A',
                                    backgroundColor : "rgba(125, 60, 152,0.5)",
                                },
                            ],
                        }}
                    />
                )
            }
        </div>
    )
}

export default LineGraph
