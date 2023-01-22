import React, {useState} from "react";
import "../../Styles/Result Page/Search-Area.css";
import {Button, Form, Collapse, CloseButton} from "react-bootstrap";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
export default function MiddleSearchArea() {

    const [formValues, setFormValues] = useState({
        search: "",
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
    const [Authors, setAuthors] = useState([]);
    const [Journals, setJournals] = useState([]);

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
                            <Button type="submit" className={"middle-search-button"}><FontAwesomeIcon icon={faSearchengin}/></Button>
                        </Form.Group>
                        <Form.Group className={"search-options"}>
                            <Button
                                className={`${collapseDate?" active search-option-button":"search-option-button"}`}
                                onClick={() => {
                                    setAdvancedSearch((prev) => false)
                                    setCollapseDate((prev) => !prev)
                                }}
                                aria-controls="date-collapse-text"
                                inline
                                aria-expanded={collapseDate}
                            >
                                Select Date &nbsp;&nbsp;
                                {collapseDate?<FontAwesomeIcon icon={faArrowUp}/>:<FontAwesomeIcon icon={faArrowDown}/>}
                            </Button>
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
                                className={`${advancedSearch?" active search-option-button":"search-option-button"}`}
                                onClick={() => {
                                    setCollapseDate((prev) => false)
                                    setAdvancedSearch((prev) => !prev)
                                }}
                                aria-controls="advancedSearch"
                                inline
                                aria-expanded={advancedSearch}
                            >
                                More &nbsp;&nbsp;{advancedSearch?<FontAwesomeIcon icon={faArrowUp}/>:<FontAwesomeIcon icon={faArrowDown}/>}
                            </Button>
                        </Form.Group>
                        <Collapse in={collapseDate}>
                            <div className={"datePicker"}>
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
                            </div>
                        </Collapse>
                        <Collapse in={advancedSearch}>
                            <div className={"advancedSearch"}>
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
                                <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                                    <Form.Label className={"advance-label"}>Enter Subject:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_subject: e.target.value}))}}
                                        value={formValues.advance_subject}
                                        placeholder={"Computer Science"}
                                        className={"advance-search-input"}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicDate" className={"advance-form-group"}>
                                    <Form.Label className={"advance-label"}>Enter Specific Keywords You Want To Find:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={async (e) => {await setFormValues((prev) => ({...prev, advance_keywords: e.target.value}))}}
                                        value={formValues.advance_keywords}
                                        placeholder={"Keywords"}
                                        className={"advance-search-input"}/>
                                </Form.Group>
                                <Form.Group controlId="UserSearch" className={"advance-form-group"}>
                                    <Button type="button" className={"advance-search-button"}>Apply Filters</Button>
                                </Form.Group>
                                   </div>
                        </Collapse>
                    </Form>
            </div>
        </>
    )
}