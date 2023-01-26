import React from "react";
import {FormCheck, Table, Form, InputGroup, Button} from "react-bootstrap";

export default function AdminResearcherUpdate() {
    return (
        <div className={"profile-articles admin-author-update"}>
            <h3>Update Researcher Status</h3>
            <Form>
                <InputGroup>
                    <InputGroup.Text id="basic-addon2">Find</InputGroup.Text>
                    <Form.Control type="email"  placeholder="Enter Author E-mail"/>
                    <Button variant="primary" id="button-addon2"> Search</Button>
                </InputGroup>
            </Form>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Author E-Mail</th>
                    <th>Author Name</th>
                    <th>Profile Link</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Some@something.edu.com</td>
                    <td>Name of Author </td>
                    <td><a href={"#"}>Profile Link will be added here to reach profile</a></td>
                    <td>
                        <InputGroup>
                            <Form.Select>
                                <option>Active</option>
                                <option>Under-Verification</option>
                                <option>Black-listed.</option>
                            </Form.Select>
                            <Button variant="primary" id="button-addon2"> Update</Button>
                        </InputGroup>

                    </td>
                </tr>
                <tr>
                    <td>Some@something.edu.com</td>
                    <td>Name of Author </td>
                    <td><a href={"#"}>Profile Link will be added here to reach profile</a></td>
                    <td>
                        <InputGroup>
                            <Form.Select>
                                <option>Active</option>
                                <option>Under-Verification</option>
                                <option>Black-listed.</option>
                            </Form.Select>
                            <Button variant="primary" id="button-addon2"> Update</Button>
                        </InputGroup>

                    </td>
                </tr>
                <tr>
                    <td>Some@something.edu.com</td>
                    <td>Name of Author </td>
                    <td><a href={"#"}>Profile Link will be added here to reach profile</a></td>
                    <td>
                        <InputGroup>
                            <Form.Select>
                                <option>Active</option>
                                <option>Under-Verification</option>
                                <option>Black-listed.</option>
                            </Form.Select>
                            <Button variant="primary" id="button-addon2"> Update</Button>
                        </InputGroup>

                    </td>
                </tr>
                <tr>
                    <td>Some@something.edu.com</td>
                    <td>Name of Author </td>
                    <td><a href={"#"}>Profile Link will be added here to reach profile</a></td>
                    <td>
                        <InputGroup>
                            <Form.Select>
                                <option>Active</option>
                                <option>Under-Verification</option>
                                <option>Black-listed.</option>
                            </Form.Select>
                            <Button variant="primary" id="button-addon2"> Update</Button>
                        </InputGroup>

                    </td>
                </tr>
                </tbody>
            </Table>

        </div>
    )
}