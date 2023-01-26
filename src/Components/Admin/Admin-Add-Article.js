import React from "react";
import {Button, Form, FormCheck, InputGroup, Table} from "react-bootstrap";

export default function AdminAddArticle() {
    return(
            <div className={"profile-articles admin-author-update"}>
                <h3>Add Articles</h3>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Date of Upload</th>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                        <td>Energy and policy considerations for deep learning in NLP</td>
                        <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                        <td>
                            <Form>
                                <InputGroup>
                                    <Form.Select placeholder={"Update Status"}>
                                        <option>Waiting</option>
                                        <option>In Progress</option>
                                        <option>Accepted</option>
                                        <option>Rejected</option>
                                    </Form.Select>
                                    <Button variant="primary" id="button-addon2"> Update</Button>

                                </InputGroup>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                        <td>Energy and policy considerations for deep learning in NLP</td>
                        <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                        <td>
                            <Form>
                                <InputGroup>
                                    <Form.Select placeholder={"Update Status"}>
                                        <option>Waiting</option>
                                        <option>In Progress</option>
                                        <option>Accepted</option>
                                        <option>Rejected</option>
                                    </Form.Select>
                                    <Button variant="primary" id="button-addon2"> Update</Button>

                                </InputGroup>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                        <td>Energy and policy considerations for deep learning in NLP</td>
                        <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                        <td>
                            <Form>
                                <InputGroup>
                                    <Form.Select placeholder={"Update Status"}>
                                        <option>Waiting</option>
                                        <option>In Progress</option>
                                        <option>Accepted</option>
                                        <option>Rejected</option>
                                    </Form.Select>
                                    <Button variant="primary" id="button-addon2"> Update</Button>

                                </InputGroup>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                        <td>Energy and policy considerations for deep learning in NLP</td>
                        <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                        <td>
                            <Form>
                                <InputGroup>
                                    <Form.Select placeholder={"Update Status"}>
                                        <option>Waiting</option>
                                        <option>In Progress</option>
                                        <option>Accepted</option>
                                        <option>Rejected</option>
                                    </Form.Select>
                                    <Button variant="primary" id="button-addon2"> Update</Button>

                                </InputGroup>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                        <td>Energy and policy considerations for deep learning in NLP</td>
                        <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                        <td>
                            <Form>
                                <InputGroup>
                                    <Form.Select placeholder={"Update Status"}>
                                        <option>Waiting</option>
                                        <option>In Progress</option>
                                        <option>Accepted</option>
                                        <option>Rejected</option>
                                    </Form.Select>
                                    <Button variant="primary" id="button-addon2"> Update</Button>

                                </InputGroup>
                            </Form>
                        </td>
                    </tr>

                    </tbody>
                </Table>
            </div>
    )
}