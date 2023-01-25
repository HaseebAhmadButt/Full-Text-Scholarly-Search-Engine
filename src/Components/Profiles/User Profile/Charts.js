import {Bar} from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {Chart as Charts, LinearScale, LineElement, Tooltip, Title, Legend,
    CategoryScale, PointElement, BarElement, PieController, ArcElement, Filler} from "chart.js";
Charts.register(
    LinearScale, LineElement, Tooltip, Title, Legend, CategoryScale, LinearScale, PointElement,
    zoomPlugin,BarElement, PieController,ArcElement, Filler
)

//See Line Chart.js documentation for understanding of this chart is working. Buttons are just changing the
//state value with different value based on selected button. Everything else is done by chart.js library.
export default function LineChart() {
    const props = {
        data: {2013: 1, 2014: 2, 2015: 5, 2016: 6, 2017: 14, 2018: 12, 2019: 11, 2020: 19, 2021: 5, 2022: 6}
    }
    let Citations_Data = {
        //All labels needed for proper display of Chart
        labels: Object.keys(props.data),
        datasets: [
            {
                label: "Citations",
                data: Object.values(props.data),
                backgroundColor: ['rgba(54, 162, 235, 0.72)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            }
            , {
                label: "Publications",
                data: Object.values(props.data),
                backgroundColor: ['rgba(54, 162, 235, 0.5)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            },
            {
                label: "Authors Collaborated With",
                data: Object.values(props.data),
                backgroundColor: ['rgba(54, 162, 235, 0.3)',],
                borderColor: "rgb(135, 206, 235)",
                borderWidth: 0,
                order: 1
            }
        ]
    }
    return(
        <div className={"charts"}> {/*This is the main div of this component*/}
            <div className={"Charts_Div"}>
                <Bar
                    data={Citations_Data}
                    options={{
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
                        barThickness:15,
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
    )
}