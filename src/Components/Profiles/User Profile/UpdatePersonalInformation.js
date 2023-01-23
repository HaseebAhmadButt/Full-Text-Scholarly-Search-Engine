import {Button, Form} from "react-bootstrap";

export default function UpdatePersonalInformation() {
    return (
        <>
        <Form className={"personal-profile-update-form"}>
            <h2>Researcher Information</h2>
            <Form.Group controlId="UserSearch" className={"personal-profile-update-fields"}>
                <Form.Label>
                    Name:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Full name as it appears on your articles"
                    className={"middle-search-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Add other names:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Add other names you have published"
                    className={"middle-search-input"}/>
                <Button variant={"primary"} className={"personal-profile-update-button"}>
                    Add
                </Button>
                <div style={{clear:"right"}}></div>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Affiliation:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    E-Mail for Verification:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Areas of Interest:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Add other names you have published"
                    className={"middle-search-input"}/>
                <Button variant={"primary"} className={"personal-profile-update-button"}>
                    Add
                </Button>
                <div style={{clear:"right"}}></div>

            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Affiliation Homepage:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Personal Site:
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input"}/>
            </Form.Group>
            <Button variant={"primary"} className={"personal-profile-update-main-button"}>Update</Button>
        </Form>
        </>
    )
}