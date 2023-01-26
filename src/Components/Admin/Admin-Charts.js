import React from "react";
import {Bar} from "react-chartjs-2";

export default function AdminCharts() {
    const props = {
        data: {2013: 1, 2014: 2, 2015: 5, 2016: 6, 2017: 14, 2018: 12, 2019: 11, 2020: 19, 2021: 5, 2022: 6}
    }
    let Accepted_Data = {
        //All labels needed for proper display of Chart
        labels: Object.keys(props.data),
        datasets: [
            {
                label: "Accepted",
                data: Object.values(props.data),
                backgroundColor: ['rgba(54, 162, 235, 0.72)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            }
        ]
    }
    let Other_Data = {
        //All labels needed for proper display of Chart
        labels: Object.keys(props.data),
        datasets: [
            {
                label: "Rejected",
                data: Object.values(props.data),
                backgroundColor: ['rgba(54, 162, 235, 0.72)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            }
            , {
                label: "Under-Verification",
                data: Object.values(props.data),
                backgroundColor: ['rgba(54, 162, 235, 0.5)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            }
        ]
    }
    return(
        <>
            <div className={"admin-charts"}>
                <div className={"Admin-Charts-Div"}>
                    <Bar data={Accepted_Data} options={{
                            scales:{
                                x:{
                                    min:Object.keys(props.data).length-10,
                                    max:Object.keys(props.data).length,
                                },

                                y:{
                                    max:Math.max(...Object.values(props.data))+2,
                                    beginAtZero:true
                                }
                            },
                            barThickness:25,
                            maintainAspectRatio:true,
                            animations: {
                                tension: {
                                    duration: 10000,
                                    easing: 'linear',
                                    from: 1,
                                    to: 0,
                                    loop: true
                                }
                            },
                            plugins:
                                {
                                    zoom: {
                                        pan: {
                                            enabled:true,
                                            mode:'x',
                                        },
                                        zoom: {
                                            wheel: {enabled: true,},
                                            pinch: {enabled: true},
                                            mode: 'x',
                                        }
                                    },
                                }
                        }}/>
                </div>
                <div className={"Admin-Charts-Div"}>
                    <Bar data={Other_Data} options={{
                        scales:{
                            x:{
                                min:Object.keys(props.data).length-10,
                                max:Object.keys(props.data).length,
                            },

                            y:{
                                max:Math.max(...Object.values(props.data))+2,
                                beginAtZero:true
                            }
                        },
                        barThickness:8,
                        maintainAspectRatio:true,
                        animations: {
                            tension: {
                                duration: 10000,
                                easing: 'linear',
                                from: 1,
                                to: 0,
                                loop: true
                            }
                        },
                        plugins:
                            {
                                zoom: {
                                    pan: {
                                        enabled:true,
                                        mode:'x',
                                    },
                                    zoom: {
                                        wheel: {enabled: true,},
                                        pinch: {enabled: true},
                                        mode: 'x',
                                    }
                                },
                            }
                    }}/>
                </div>

            </div>
        </>
    )
}