import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {Button, Form} from "react-bootstrap";

export default function ResultsShowingSearch() {
    return (
        <>
           <div className={"result-profile-filters"}>
               <Form.Group controlId="formBasicDate" className={"middle-search-form advance-form-group filter-search-group"}>
                   <Form.Control type="text" placeholder="Search" className={"middle-search-input filter-search"}/>
                   <Button type="submit" className={"middle-search-button filter-search-button"}>Search</Button>
                   <DropdownMultiselect
                          className={"something"}
                          placeholder="Select Co-Authors"
                          options={["Australia", "Canada", "USA", "Poland", "Spain", "France"]}
                          name="countries"
                   />
                   <DropdownMultiselect
                       className={"something"}
                       placeholder="Top Journals"
                       options={["Australia", "Canada", "USA", "Poland", "Spain", "France"]}
                       name="countries"
                   />
               </Form.Group>
           </div>
        </>
    );
}