import React from "react";
import "../../Styles/Result Page/Search-Area.css";
import {Button, Form} from "react-bootstrap";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
export default function MiddleSearchArea() {
    return (
        <>
            <div className={"middle-search-area"}>
                {/*<div className={"search-form-div"}>*/}
                    <Form >
                        <Form.Group controlId="UserSearch" className={"middle-search-form"}>
                            <Form.Control type="text" placeholder="Search for a paper, author, or topic" className={"middle-search-input"}/>
                            <Button type="submit" className={"middle-search-button"}><FontAwesomeIcon icon={faSearchengin}/></Button>
                        </Form.Group>
                        <Form.Group className={"search-options"}>
                            <Button
                                className={"search-option-button"}
                                // onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                inline
                                // aria-expanded={open}
                            >
                                Select Date &nbsp;&nbsp;<FontAwesomeIcon icon={faArrowDown}/>
                            </Button>
                            <Form.Check inline type={"switch"}  className={"search-option-field"} label={"Sort By Date"}></Form.Check>
                            <Form.Check inline type={"switch"}   label={"Sort By Citations"}></Form.Check>
                            <Button
                                className={"search-option-button"}
                                // onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                inline
                                // aria-expanded={open}
                            >
                                More &nbsp;&nbsp;<FontAwesomeIcon icon={faArrowDown}/>
                            </Button>
                        </Form.Group>
                    </Form>
                {/*</div>*/}
            </div>
        </>
    )
}