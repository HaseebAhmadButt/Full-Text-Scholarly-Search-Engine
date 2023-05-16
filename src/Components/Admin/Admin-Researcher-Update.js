import React, {useContext, useEffect, useState} from "react";
import {Table, Form, InputGroup, Button, Pagination} from "react-bootstrap";
import {getAllAuthors, getAuthorsWithEmail} from "../../Services/AdminService/DataRetrievalMethods"
import {blockAuthor, removeBlockAuthor} from "../../Services/AdminService/DataWriteService"
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {useNavigate} from "react-router-dom";
export default function AdminResearcherUpdate() {
    const navigator = useNavigate()
    const context = useContext(User_Sign_In_Context)
    const [authorList, setAuthorList] = useState([]);
    const [findAuthorPagination, setFindAuthorPagination] = useState({
        activePage:1,
        totalPages: 1,
        totalElements:0,
        elementsPerPage:1
    })
    const [authorEmail, setAuthorEmail] = useState("")
    const [paginationStat, setPaginationStat] = useState(false)
    const [displayableAuthors, setDisplayableAuthors] = useState([])
    const getAuthors = async (pageNo, pageSize) =>{
        const data = await getAllAuthors(pageNo, pageSize);
        let pages;
        if(data.totalPages > 10){
            pages = 10
        }
        else{
            pages = data.totalPages
        }
        await setFindAuthorPagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: data.totalElements,
            activePage: (data.pageable.pageNumber)+1,
            elementsPerPage: data.size
        }))
        console.log("All authors Method: ", data)
        await setAuthorList(data.content);
    }
    console.log(authorList)
    const authorWithEmail = async (pageNo, pageSize, authorEmail) =>{
        const data = await getAuthorsWithEmail(pageNo, pageSize,authorEmail);
        let pages;
        if(data.totalPages > 10){
            pages = 10
        }
        else{
            pages = data.totalPages
        }
        await setFindAuthorPagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: data.totalElements,
            activePage: (data.pageable.pageNumber)+1,
            elementsPerPage: data.size
        }))
        await setAuthorList(data.content);
    }

    const handleFindAuthorPaginationClick = async (pageNumber) => {
        if(pageNumber === findAuthorPagination.activePage) return;
        if(paginationStat) await authorWithEmail((pageNumber-1), findAuthorPagination.elementsPerPage, authorEmail)
        else await getAuthors((pageNumber-1), findAuthorPagination.elementsPerPage);
    };

    let items = [];
    for (let number = 1; number <= findAuthorPagination.totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === findAuthorPagination.activePage}
                onClick={async () => await handleFindAuthorPaginationClick(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }
    useEffect(() => {
        getAuthors(0,10).then(r => {})
    }, []);
    const handlePublisherStatusChange = async (publisherID, status) =>{
        console.log("Inside Status Change Handler")
        if(status === "BLOCKED"){
            console.log("Author Blocked")

            const body = {
                publisherID: publisherID,
                adminID: context.userLogIn.user_id
            }
            await blockAuthor(body)
        }
        else{
            console.log("Author Released")

            const body = {
                publisherID: publisherID,
            }
            await removeBlockAuthor(body)
        }
        if(paginationStat) {
            console.log("Pagination Stat is Set")
            await authorWithEmail(findAuthorPagination.activePage, findAuthorPagination.elementsPerPage, authorEmail)
        }
        else {
            console.log("Pagination Stat is not Set")
            await getAuthors(findAuthorPagination.activePage, findAuthorPagination.elementsPerPage);
        }
    }


    const authors = authorList.map((author, index) => {
            /*
            his method is handling the change in the status of an author in a list of authors.
            It takes an event object as a parameter, which is the change event that occurred on the form.
            It then creates a new object updatedAuthor using the spread operator, which copies all the properties of the
            author object and updates its publisherStatus property to the new value selected by the user.
            The method then creates a new array updatedAuthorList using the spread operator and copies all the
            elements from the authorList array. It then updates the element at the given index with the updatedAuthor
            object. Finally, it sets the state of the authorList to the updatedAuthorList, causing the UI to
            update with the new values.
             */
            const handleStatusChange = (event) => {
                const updatedAuthor = { ...author, publisherStatus: event.target.value };
                const updatedAuthorList = [...authorList];
                updatedAuthorList[index] = updatedAuthor;
                setAuthorList(updatedAuthorList);
            };
            return (
                <tr key={author.publisherID}>
                    <td>{author.publisherEmail}</td>
                    <td>{author.publisherName}</td>
                    <td>
                        <a href={`${author.affiliationLink}`} target="_blank">
                            {author.affiliationName}
                        </a>
                    </td>
                    <td>
                        <span
                            style={{cursor:'pointer'}}
                            onClick={()=>{navigator(`/profile/${author.publisherID}`)}}
                        >
                            Open Profile
                        </span>
                    </td>
                    <td>
                        <InputGroup>
                            <Form.Select value={author.publisherStatus} onChange={handleStatusChange}>
                                <option value="ACTIVE">Active</option>
                                <option value="BLOCKED">Block</option>
                            </Form.Select>
                            <Button
                                variant="primary"
                                id="button-addon2"
                                onClick={async () => {
                                    console.log("Status Change Button Clicked")
                                   await handlePublisherStatusChange( author.publisherID, author.publisherStatus)
                                }}
                            >
                                Update
                            </Button>
                        </InputGroup>
                    </td>
                </tr>
            );
        });

    return (
        <div className={"profile-articles admin-author-update"}>
            <h3>Update Researcher Status</h3>
            <Form>
                <InputGroup>
                    <InputGroup.Text id="basic-addon2">Find</InputGroup.Text>
                    <Form.Control type="email"  placeholder="Enter Author E-mail"
                        onChange={async (e) =>{
                            await setAuthorEmail(e.target.value)
                        }}
                    />
                    <Button variant="primary" id="button-addon2"
                    onClick={async () =>{
                        if(authorEmail.trim()===""){
                            await getAuthors(0, 10)
                            await setPaginationStat(false)
                        }
                        else{
                            await setPaginationStat(true)
                            await authorWithEmail(0, 10, authorEmail)
                        }
                    }}
                    > Search</Button>
                </InputGroup>
            </Form>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Author E-Mail</th>
                    <th>Author Name</th>
                    <th>Affiliation</th>
                    <th>Profile Link</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {authors}
                </tbody>
            </Table>
            <Pagination size="sm">{items}</Pagination>
        </div>
    )
}