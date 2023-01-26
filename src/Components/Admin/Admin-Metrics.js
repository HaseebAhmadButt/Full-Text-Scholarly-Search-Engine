import React from "react";
import AdminCharts from "./Admin-Charts";
import LineChart from "../Profiles/User Profile/Charts";
import ListGroup from "react-bootstrap/ListGroup";
import {Button, Form, InputGroup, Table} from "react-bootstrap";

export default function AdminMetrics() {
    return(
        <>
            <div className={"profile-articles"}>
                <ListGroup className={"profile-features"}>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                            <span className={"title"}>Publications </span>
                            <h1>10</h1>
                        </ListGroup.Item></a>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                        <span className={"title"}>Accepted Publications </span>
                        <h1>10</h1>
                    </ListGroup.Item></a>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                        <span className={"title"}>Rejected Publications </span>
                        <h1>10</h1>
                    </ListGroup.Item></a>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                        <span className={"title"}>Under-Verification Publication </span>
                        <h1>10</h1>
                    </ListGroup.Item></a>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                            <span className={"title"}>Authors </span>
                            <h1>10</h1>
                        </ListGroup.Item></a>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                            <span className={"title"}>Accepted Authors </span>
                            <h1>10</h1>
                        </ListGroup.Item></a>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                            <span className={"title"}>Rejected Authors </span>
                            <h1>10</h1>
                        </ListGroup.Item></a>
                    <a href={"#"} className={"profile-feature"}>
                        <ListGroup.Item className={"feature"}>
                            <span className={"title"}>Under-Verification Authors </span>
                            <h1>10</h1>
                        </ListGroup.Item></a>
                </ListGroup>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Journal Name</th>
                        <th>Total Publications</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>IEEE Journal </td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Some other journal </td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Some other journal </td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Some other journal </td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Some other journal </td>
                        <td>90</td>
                    </tr>
                    </tbody>
                </Table>


                <div className={"Admin-metrics-div"}>
                    <h4>Publications Stats</h4>
                    <AdminCharts />
                </div>
                <div className={"Admin-metrics-div"}>
                    <h4>Author Stats</h4>
                    <AdminCharts />
                </div>
                <div className={"Admin-metrics-div"}>
                    <h4>Top Journal Stats</h4>
                    <LineChart />
                </div>
            </div>
        </>
    )
}