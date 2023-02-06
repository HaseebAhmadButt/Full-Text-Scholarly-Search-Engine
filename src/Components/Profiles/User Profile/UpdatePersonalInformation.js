import React from "react";
import {Button, Form} from "react-bootstrap";

export default function UpdatePersonalInformation() {
    return(
        <>
            <Form className={"personal-profile-update-form account-settings"}>
                <h2>Account Settings</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className={"label"}>
                        Profile Picture:
                    </Form.Label>
                    <Form.Control
                        type="file"
                        placeholder="Upload a profile picture"
                        className={"profile-upload"}
                        />

                    <Form.Label className={"label"}>
                        Name:
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter New Name"
                        className={"middle-search-input profile-input"}/>
                    <Form.Label className={"label"}>
                        Email address:
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter E-Mail"
                        className={"middle-search-input profile-input"}/>

                    <Form.Label className={"label"}>
                        Password:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Password"
                        className={"middle-search-input profile-input"}/>

                    <Form.Label className={"label"}>
                        Confirm Password:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Confirm Password"
                        className={"middle-search-input profile-input"}/>
                </Form.Group>
                <Button variant={"primary"} className={"personal-profile-update-main-button"}>Update</Button>
            </Form>
        </>
    )
}