import React, {useEffect, useState} from "react";
import "../../Styles/Result Page/Search-Area.css";
import {Button, Form, Collapse, CloseButton, Offcanvas, Dropdown, DropdownButton} from "react-bootstrap";
import { faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
import {useNavigate, useParams} from "react-router-dom";

export default function MiddleSearchArea(props) {
    const navigator = useNavigate()
    const [formValues, setFormValues] = useState({
        search: props.query,
        sortByDate: false,
        sortByCitations: false,
        dateFrom: "",
        dateTo: "",
        advance_author: "",
        advance_journal: "",
        advance_citations: 0,
        advance_affiliation: "",
        advance_subject: "",
        advance_keywords: ""
    });
    const [collapseDate, setCollapseDate] = useState(false);
    const [advancedSearch, setAdvancedSearch] = useState(false);

    const [collapseMobileDate, setCollapseMobileDate] = useState(false);
    const [advancedMobileSearch, setAdvancedMobileSearch] = useState(false);

    const [Authors, setAuthors] = useState([]);
    const [Journals, setJournals] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addAuthor = () => {
        if(formValues.advance_author.length > 0) {
            setAuthors((prev) => [...prev, formValues.advance_author]);
            setFormValues((prev) => ({...prev, advance_author: ""}))
        }
    }
    const addJournals = () => {
        if(formValues.advance_journal.length > 0) {
            setJournals((prev) => [...prev, formValues.advance_journal]);
            setFormValues((prev) => ({...prev, advance_journal: ""}))
        }
    }
    const displayAuthors = Authors.map((author, index) => {
        return (
            <span className={'tags form-tag'}>{author} <CloseButton onClick={()=>{
                removeAuthor(index)}} className={"close-button"}/></span>
        )
    })
    const removeAuthor = (index) => {
        setAuthors((prev) => prev.filter((_, i) => i !== index));
    }
    const displayJournals = Journals.map((Journal, index) => {
        return (
            <span className={'tags form-tag'}>{Journal} <CloseButton onClick={()=>{
                removeJournals(index)}} className={"close-button"}/></span>
        )
    })
    const removeJournals = (index) => {
        setJournals((prev) => prev.filter((_, i) => i !== index));
    }
    const OpenSearchResults = (e) => {
        console.log("Search Button Pressed")
        e.preventDefault();
        if(formValues.search.trim().length===0 || formValues.search===props.query) return;
        props.changeStat(formValues.search.trim())
        navigator(`/search/results/${formValues.search.trim()}`)
        window.location.reload();

    }
    return (
        <>
            <div className={"middle-search-area"}>
                    <Form >
                        <Form.Group controlId="UserSearch" className={"middle-search-form"}>
                            <Form.Control
                                type="text"
                                value={formValues.search}
                                onChange={async (e) => {
                                    await setFormValues((prev) => ({...prev, search: e.target.value}))
                                }}
                                placeholder="Search for a paper, author, or topic"
                                className={"middle-search-input"}/>
                            <Button type="submit" className={"middle-search-button"} onClick={OpenSearchResults}><FontAwesomeIcon icon={faSearchengin}/></Button>
                        </Form.Group>
                        {!props.serverError && !props.notFoundError?
                            <><Form.Group className={"search-options"}>
                            <Button
                                className={`${collapseDate ? " active search-option-button" : "search-option-button"}`}
                                onClick={() => {

                                    setAdvancedSearch((prev) => false)
                                    setCollapseDate((prev) => !prev)
                                }}
                                aria-controls="date-collapse-text"
                                inline
                                aria-expanded={collapseDate}
                            >
                                Select Date &nbsp;&nbsp;
                                {collapseDate ? <FontAwesomeIcon icon={faAngleUp}/> :
                                    <FontAwesomeIcon icon={faAngleDown}/>}
                            </Button>
                            <Form.Check
                                inline
                                onChange={async (e) => {
                                    // console.log()
                                    await props.enableDateSort(e.target.checked)
                                }}
                                type={"switch"}
                                className={"search-option-field"}
                                label={"Sort By Date"}
                            />
                            {/*// setFormValues((prev) => ({...prev, sortByDate: !prev.sortByDate}))*/}


                            <Form.Check
                                inline
                                // setFormValues((prev) => ({...prev, sortByCitations: !prev.sortByCitations}))
                                onChange={async (e) => {
                                    // console.log()
                                    await props.enableCitationSort(e.target.checked)
                                }}
                                type={"switch"}
                                className={"search-option-field"}
                                label={"Sort By Citations"}/>
                            <Button
                                className={`${advancedSearch ? " active search-option-button" : "search-option-button"}`}
                                onClick={() => {
                                    setCollapseDate((prev) => false)
                                    setAdvancedSearch((prev) => {
                                        if (prev) props.selectedJournalFlag(false)
                                        return (!prev)
                                    })

                                }}
                                aria-controls="advancedSearch"
                                inline
                                aria-expanded={advancedSearch}
                            >
                                More &nbsp;&nbsp;{advancedSearch ? <FontAwesomeIcon icon={faAngleUp}/> :
                                <FontAwesomeIcon icon={faAngleDown}/>}
                            </Button>
                        </Form.Group>
                            <Form.Group>
                            <Button variant="primary" onClick={handleShow} className={"hamburger-menue"}>
                            <div></div>
                            <div></div>
                            <div></div>
                            </Button>
                            <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Search Filters</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className={"mobile-search-options"}>

                            <Form.Check
                            inline
                            onChange={() => {
                            setFormValues((prev) => ({...prev, sortByDate: !prev.sortByDate}))
                        }}
                            type={"switch"}
                            className={"search-option-field"}
                            label={"Sort By Date"}
                            />

                            <Form.Check
                            inline
                            onChange={() => {
                            setFormValues((prev) => ({...prev, sortByCitations: !prev.sortByCitations}))
                        }}
                            type={"switch"}
                            className={"search-option-field"}
                            label={"Sort By Citations"} />
                            <Button
                            className={`${collapseMobileDate?" mobile-active mobile-search-option-button":"mobile-search-option-button"}`}
                            onClick={() => {
                            setAdvancedMobileSearch((prev) => false)
                            setCollapseMobileDate((prev) => !prev)
                        }}
                            aria-controls="date-collapse-text"
                            inline
                            aria-expanded={collapseMobileDate}
                            >
                            Select Date &nbsp;&nbsp;
                        {collapseMobileDate?<FontAwesomeIcon icon={faAngleUp}/>:<FontAwesomeIcon icon={faAngleDown}/>}
                            </Button>
                            <Collapse in={collapseMobileDate}>
                            <div className={"datePicker"}>
                            <Form.Group controlId="formBasicDate">
                        {/*<Form.Control*/}
                        {/*    type="text"*/}
                        {/*    onChange={async (e) => {*/}
                        {/*        console.log(e.target.value)*/}
                        {/*        // await setFormValues((prev) => ({...prev, dateFrom: e.target.value}))*/}
                        {/*    }}*/}
                        {/*    placeholder="Starting Year"*/}
                        {/*    className={"dateField"}*/}
                        {/*    value={formValues.dateFrom}*/}
                        {/*/>*/}
                            <span> - </span>
                        {/*<Form.Control*/}
                        {/*    type="text"*/}
                        {/*    onChange={async (e) => {await setFormValues((prev) => ({...prev, dateTo: e.target.value}))}}*/}
                        {/*    placeholder="Ending Year"*/}
                        {/*    className={"dateField"}*/}
                        {/*    value={formValues.dateTo}*/}
                        {/*/>*/}
                            <Form.Group controlId="UserSearch" className={"advance-form-group"}>
                            <Button type="button" className={"advance-search-button"}>Update Results</Button>
                            </Form.Group>
                            </Form.Group>
                            </div>
                            </Collapse>

                            <Button
                            className={`${collapseMobileDate?" mobile-active mobile-search-option-button":"mobile-search-option-button"}`}
                            onClick={() => {
                            setCollapseMobileDate((prev) => false)
                            setAdvancedMobileSearch((prev) => !prev)
                        }}
                            aria-controls="advancedSearch"
                            inline
                            aria-expanded={advancedMobileSearch}
                            >
                            More &nbsp;&nbsp;{advancedMobileSearch?<FontAwesomeIcon icon={faAngleUp}/>:<FontAwesomeIcon icon={faAngleDown}/>}
                            </Button>
                            <Collapse in={advancedMobileSearch}>
                            <div className={"advancedSearch advancedMobileSearch"}>
                            <Form.Group controlId="formBasicDate">

                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, dateFrom: e.target.value}))}}
                            placeholder="Starting Year"
                            className={"dateField"}
                            value={formValues.dateFrom}
                            />

                            <span> - </span>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, dateTo: e.target.value}))}}
                            placeholder="Ending Year"
                            className={"dateField"}
                            value={formValues.dateTo}
                            />
                            </Form.Group>
                            <Form.Group controlId="formBasicDate" className={"middle-search-form advance-form-group"}>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_author: e.target.value}))}}
                            value={formValues.advance_author}
                            placeholder="Enter Author/s"
                            className={"middle-search-input"} />
                            <Button
                            type="button"
                            onClick={addAuthor}
                            className={"middle-search-button"}
                            >Add</Button>
                            </Form.Group>
                            <div className={"tags-dive"}>
                        {displayAuthors}
                            </div>
                            <Form.Group controlId="formBasicDate" className={"middle-search-form advance-form-group"}>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_journal: e.target.value}))}}
                            value={formValues.advance_journal}
                            placeholder="Journal"
                            className={"middle-search-input"}/>
                            <Button
                            type="button"
                            onClick={addJournals}
                            className={"middle-search-button"}>Add</Button>
                            </Form.Group>
                            <div className={"tags-dive"}>
                        {displayJournals}
                            </div>
                            <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                            <Form.Label className={"advance-label"}>Enter Citations Limit:</Form.Label>
                            <Form.Control
                            type="number"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_citation: e.target.value}))}}
                            value={formValues.advance_citation}
                            placeholder={"Enter Citation Limit"}
                            className={"advance-search-input advance-mobile-search-input"}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                            <Form.Label className={"advance-label"}>Enter Affiliation of Author/s:</Form.Label>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_affiliation: e.target.value}))}}
                            value={formValues.advance_affiliation}
                            placeholder={"National University of Sciences and Technology"}
                            className={"advance-search-input advance-mobile-search-input"}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                            <Form.Label className={"advance-label"}>Enter Subject:</Form.Label>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_subject: e.target.value}))}}
                            value={formValues.advance_subject}
                            placeholder={"Computer Science"}
                            className={"advance-search-input advance-mobile-search-input"}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                            <Form.Label className={"advance-label"}>Enter Specific Keywords You Want To Find:</Form.Label>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_keywords: e.target.value}))}}
                            value={formValues.advance_keywords}
                            placeholder={"Keywords"}
                            className={"advance-search-input advance-mobile-search-input"}/>
                            </Form.Group>
                            <Form.Group controlId="UserSearch" className={"advance-form-group"}>
                            <Button type="button" className={"advance-search-button"}>Update Results</Button>
                            </Form.Group>
                            </div>
                            </Collapse>

                            <Button
                            className={"mobile-search-option-button"}
                            style={{marginLeft: "1%"}}
                            onClick={() => {
                            window.open("https://vasturiano.github.io/3d-force-graph/example/highlight/", "_blank")
                        }
                        }>
                            View Graphically
                            </Button>

                            </Offcanvas.Body>
                            </Offcanvas>
                            </Form.Group>
                            <Collapse in={collapseDate}>
                            <div className={"datePicker"}>
                            <Form.Group controlId="formBasicDate">
                            <Form.Control
                            type="text"
                            onChange={async (e) => {
                            if(isNaN(e.target.value)) return;
                            if(e.target.value.length>4) e.target.value = e.target.value.slice(0,4)
                            await setFormValues((prev) => ({...prev, dateFrom: e.target.value}))}
                        }
                            placeholder="Starting Year"
                            className={"dateField"}
                            value={formValues.dateFrom}
                            />
                            <span> - </span>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {
                            if(isNaN(e.target.value)) return;
                            if(e.target.value.length>4) e.target.value = e.target.value.slice(0,4)
                            await setFormValues((prev) => ({...prev, dateTo: e.target.value}))}
                        }
                            placeholder="Ending Year"
                            className={"dateField"}
                            value={formValues.dateTo}
                            />
                            </Form.Group>
                            <Form.Group controlId="UserSearch" className={"advance-form-group"}>
                            <Button
                            type="button"
                            className={""}
                            onClick={async ()=>{
                            if (formValues.dateFrom.trim()==="" || formValues.dateTo.trim()===""){
                            await props.betweenArticlesMethod(false)
                        }
                            else if(formValues.dateFrom===formValues.dateTo){
                            alert("Same Year have been passed. Year should be different")
                        }
                            else{
                            await props.fetchArticlesBetweenArticlesFlag(formValues.dateFrom, formValues.dateTo)
                            await props.betweenArticlesMethod(true)
                        }
                        }}
                            >Update Results</Button>
                            </Form.Group>
                            </div>
                            </Collapse>
                            <Collapse in={advancedSearch}>
                            <div className={"advancedSearch"}>
                        {/*<Form.Group controlId="formBasicDate">*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        onChange={async (e) => {await setFormValues((prev) => ({...prev, dateFrom: e.target.value}))}}*/}
                        {/*        placeholder="Starting Year"*/}
                        {/*        className={"dateField"}*/}
                        {/*        value={formValues.dateFrom}*/}
                        {/*    />*/}

                        {/*    <span> - </span>*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        onChange={async (e) => {await setFormValues((prev) => ({...prev, dateTo: e.target.value}))}}*/}
                        {/*        placeholder="Ending Year"*/}
                        {/*        className={"dateField"}*/}
                        {/*        value={formValues.dateTo}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                            <Form.Group controlId="formBasicDate" className={"middle-search-form advance-form-group"}>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_author: e.target.value}))}}
                            value={formValues.advance_author}
                            placeholder="Enter Author/s"
                            className={"middle-search-input"} />
                            <Button
                            type="button"
                            onClick={addAuthor}
                            className={"middle-search-button"}
                            >Add</Button>
                            </Form.Group>
                            <div className={"tags-dive"}>
                        {displayAuthors}
                            </div>
                            <Form.Group controlId="formBasicDate" className={"middle-search-form advance-form-group"}>
                            <DropdownButton id="dropdown-basic-button" title="Select Journal To See Its Papers">
                            {
                                <div className={"dropDownButton"}>
                                    {props.journalList.map((journalName) => {
                                        return (

                                            <Dropdown.Item onClick={async () => {
                                                await props.selectedJournalFlag(true);
                                                await props.selectedJournalArticles(journalName)
                                            }}>{journalName}</Dropdown.Item>)
                                    })}
                                </div>
                            }
                            </DropdownButton>
                        {/*<Form.Control*/}
                        {/*    type="text"*/}
                        {/*    onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_journal: e.target.value}))}}*/}
                        {/*    value={formValues.advance_journal}*/}
                        {/*    placeholder="Journal"*/}
                        {/*    className={"middle-search-input"}/>*/}
                        {/*<Button*/}
                        {/*    type="button"*/}
                        {/*      onClick={addJournals}*/}
                        {/*    className={"middle-search-button"}>Add</Button>*/}
                            </Form.Group>
                        {/*<div className={"tags-dive"}>*/}
                        {/*    {displayJournals}*/}
                        {/*</div>*/}
                            <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                            <Form.Label className={"advance-label"}>Enter Citations Limit:</Form.Label>
                            <Form.Control
                            type="number"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_citation: e.target.value}))}}
                            value={formValues.advance_citation}
                            placeholder={"Enter Citation Limit"}
                            className={"advance-search-input"}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                            <Form.Label className={"advance-label"}>Enter Affiliation of Author/s:</Form.Label>
                            <Form.Control
                            type="text"
                            onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_affiliation: e.target.value}))}}
                            value={formValues.advance_affiliation}
                            placeholder={"National University of Sciences and Technology"}
                            className={"advance-search-input"}/>
                            </Form.Group>
                            {/*<Form.Group controlId="formBasicDate" className={"advance-form-group"}>*/}
                            {/*<Form.Label className={"advance-label"}>Enter Subject:</Form.Label>*/}
                            {/*<Form.Control*/}
                            {/*type="text"*/}
                            {/*onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_subject: e.target.value}))}}*/}
                            {/*value={formValues.advance_subject}*/}
                            {/*placeholder={"Computer Science"}*/}
                            {/*className={"advance-search-input"}/>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group controlId="formBasicDate" className={"advance-form-group"}>*/}
                            {/*<Form.Label className={"advance-label"}>Enter Specific Keywords You Want To Find:</Form.Label>*/}
                            {/*<Form.Control*/}
                            {/*type="text"*/}
                            {/*onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_keywords: e.target.value}))}}*/}
                            {/*value={formValues.advance_keywords}*/}
                            {/*placeholder={"Keywords"}*/}
                            {/*className={"advance-search-input"}/>*/}
                            {/*</Form.Group>*/}
                            <Form.Group controlId="UserSearch" className={"advance-form-group"}>
                            <Button type="button" className={"advance-search-button"}>Update Results</Button>
                            </Form.Group>
                            </div>
                            </Collapse></>:null}
                    </Form>
            </div>
        </>
    )
}