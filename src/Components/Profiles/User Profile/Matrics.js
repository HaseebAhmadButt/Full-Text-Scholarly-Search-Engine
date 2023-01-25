import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Chart from "./Charts";

export default function Matrics() {
    return(
        <div className={"Metrics-Field"}>
            <h1>Profile Metrics</h1>
            <div className={"Metrics"}>
                <div className={"chart-div"}>
                    <Chart />
                </div>
                <ListGroup className={"profile-features researcher-quality"}>
                        <ListGroup.Item className={"feature profile-feature"} >
                            <span className={"title"}>Author H-Index </span>
                            <h1>10</h1>
                        </ListGroup.Item>
                        <ListGroup.Item className={"feature profile-feature"}>
                            <span className={"title"}>Author H-Median </span>
                            <h1>10</h1>
                        </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}