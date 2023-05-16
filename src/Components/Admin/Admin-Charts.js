import React, {useState} from "react";
import {Bar} from "react-chartjs-2";

export default function AdminCharts({data}) {

    if(data===undefined || data.length <= 0) return
    else {
        console.log("data: ", data)
    const countsByStatus = {};
    data.forEach(([year, status, count]) => {
        if (!countsByStatus[status]) {
            countsByStatus[status] = {};
        }
        countsByStatus[status][year] = count;
    });
    console.log("Redefined Data: ", countsByStatus)
    console.log("Accepted Data: ", Object.keys(countsByStatus.ACCEPTED))

        let Accepted_Data = {
            //All labels needed for proper display of Chart
            labels: Object.keys(countsByStatus.ACCEPTED),
            datasets: [
                {
                    label: "Accepted",
                    data: Object.values(countsByStatus.ACCEPTED),
                    backgroundColor: ['rgba(54, 162, 235, 0.72)',],
                    borderColor: "rgb(135, 206, 235)",
                    borderWidth: 0,
                    order: 1
                }
            ]
        }
        // let Other_Data = {
        //     //All labels needed for proper display of Chart
        //     labels:Object.keys(countsByStatus.REJECTED),
        //     datasets: [
        //         {
        //             label: "Rejected",
        //             data: Object.values(countsByStatus.REJECTED),
        //             backgroundColor: ['rgba(54, 162, 235, 0.72)',],
        //             borderColor: "rgb(135, 206, 235)",
        //             borderWidth: 0,
        //             order: 1
        //         }
        //         , {
        //             label: "Under-Verification",
        //             data: Object.values(countsByStatus["IN-PROGRESS"]),
        //             backgroundColor: ['rgba(54, 162, 235, 0.5)',],
        //             borderColor: "rgb(135, 206, 235)",
        //             borderWidth: 0,
        //             order: 1
        //         }
        //     ]
        // }
        let Other_Data = {
            // All labels needed for proper display of Chart
            labels: [],
            datasets: []
        };

        if (countsByStatus.REJECTED) {
            Other_Data.labels = Object.keys(countsByStatus.REJECTED);
            Other_Data.datasets.push({
                label: "Rejected",
                data: Object.values(countsByStatus.REJECTED),
                backgroundColor: ['rgba(54, 162, 235, 0.72)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            });
        }

        if (countsByStatus["IN-PROGRESS"]) {
            if (Other_Data.labels.length === 0) {
                Other_Data.labels = Object.keys(countsByStatus["IN-PROGRESS"]);
            }

            Other_Data.datasets.push({
                label: "Under-Verification",
                data: Object.values(countsByStatus["IN-PROGRESS"]),
                backgroundColor: ['rgba(54, 162, 235, 0.5)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            });
        }

        return (
            <>
                <div className={"admin-charts"}>
                    {countsByStatus.ACCEPTED?<div className={"Admin-Charts-Div"}>
                        <Bar data={Accepted_Data} options={{
                            scales: {
                                x: {
                                    min: Object.keys(countsByStatus.ACCEPTED).length - 10,
                                    max: Object.keys(countsByStatus.ACCEPTED).length,
                                },

                                y: {
                                    max: Math.max(...Object.values(countsByStatus.ACCEPTED)) + 2,
                                    beginAtZero: true
                                }
                            },
                            barThickness: 50,
                            maintainAspectRatio: true,
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
                                            enabled: true,
                                            mode: 'x',
                                        },
                                        zoom: {
                                            wheel: {enabled: true,},
                                            pinch: {enabled: true},
                                            mode: 'x',
                                        }
                                    },
                                }
                        }}/>
                    </div>:null}
                    {countsByStatus.REJECTED|| countsByStatus["IN-PROGRESS"]?
                        <div className={"Admin-Charts-Div"}>
                        <Bar data={Other_Data} options={{
                            scales: {
                                x: {
                                    // min: Object.keys(countsByStatus["IN-PROGRESS"]).length - 10
                                    min: 0,
                                    // max: Object.keys(countsByStatus["IN-PROGRESS"]).length,
                                    max: Other_Data.labels.length,
                                },

                                y: {
                                    max: Math.max(...Object.values(countsByStatus.REJECTED || {}).concat(Object.values(countsByStatus["IN-PROGRESS"] || {}))) + 2,
                                    // max: Math.max(...Object.values(countsByStatus["IN-PROGRESS"])) + 2,
                                    beginAtZero: true
                                }
                            },
                            barThickness: 25,
                            maintainAspectRatio: true,
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
                                            enabled: true,
                                            mode: 'x',
                                        },
                                        zoom: {
                                            wheel: {enabled: true,},
                                            pinch: {enabled: true},
                                            mode: 'x',
                                        }
                                    },
                                }
                        }}/>
                    </div>:null}

                </div>
            </>
        )
    }
}