import React, {useContext, useEffect, useState} from "react";
import {Button, Form, FormCheck, InputGroup, Pagination, Table} from "react-bootstrap";
import {getAllAddedArticles, getAllAddedArticlesWithQuery, downloadPDF} from "../../Services/AdminService/DataRetrievalMethods";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {
    AcceptUploadedArticle,
    RejectSingleArticle,
    RejectUploadedArticle,
} from "../../Services/AdminService/DataWriteService"

export default function AdminAddArticle() {
    const context = useContext(User_Sign_In_Context)
    const [acceptedArticles, setAcceptedArticles] = useState([])
    const [findAuthorPagination, setFindAuthorPagination] = useState({
        activePage:1,
        totalPages: 1,
        totalElements:0,
        elementsPerPage:1
    })
    const [searchQuery, setSearchQuery] = useState("")
    const [paginationStat, setPaginationStat] = useState(false)
    const getArticles = async (pageNo, pageSize) =>{
        const data = await getAllAddedArticles(pageNo, pageSize);
        let pages;
        if(data.totalPages > 10){
            pages = 10
        }
        else{
            pages = data.totalPages
        }
        setFindAuthorPagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: data.totalElements,
            activePage: (data.pageable.pageNumber)+1,
            elementsPerPage: data.size
        }))
        await setAcceptedArticles(data.content);
    }
    const getArticlesWithQuery = async (pageNo, pageSize, query) =>{
        const data = await getAllAddedArticlesWithQuery(pageNo, pageSize, query);
        let pages;
        if(data.totalPages > 10){
            pages = 10
        }
        else{
            pages = data.totalPages
        }
        setFindAuthorPagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: data.totalElements,
            activePage: (data.pageable.pageNumber)+1,
            elementsPerPage: data.size
        }))
        await setAcceptedArticles(data.content);
    }

    const handleFindAuthorPaginationClick = async (pageNumber) => {
        if(pageNumber === findAuthorPagination.activePage) return;
        if(paginationStat) await getArticlesWithQuery((pageNumber-1), findAuthorPagination.elementsPerPage, searchQuery)
        else await getArticles((pageNumber-1), findAuthorPagination.elementsPerPage)
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
    useEffect(()=>{
        getArticles(0, 10).then()
    },[])


    const handleDownloadPDF = async (pdfAddress) => {
        try {
            const blob = await downloadPDF(pdfAddress);
            // const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);
            window.open(pdfUrl, '_blank'); // Open PDF in a new tab
        } catch (error) {
            console.log(error);
        }
    };
    const handlePublisherStatusChange = async (doi, status) =>{
        if(status === "IN-PROGRESS") return;
            if(status === "ACCEPTED"){
            const body = {
                DOI: doi,
                adminID: context.userLogIn.user_id
            }
            await AcceptUploadedArticle(body)
        }
        else{
            const reason = prompt("Provide Reason to Reject this article:")
                if(reason.trim()===""){
                    alert("No Reason Provided. Can't Reject the Article")
                    return;
                }
            const body = {
                DOI: doi,
                adminID: context.userLogIn.user_id,
                Reason: reason
            }
            await RejectSingleArticle(body)
        }
        if(paginationStat) await getArticlesWithQuery(0, findAuthorPagination.elementsPerPage, searchQuery)
        else await getArticles(0, findAuthorPagination.elementsPerPage);
    }
    const articles = acceptedArticles.map((article, index)=>{
        const handleStatusChange = (event) => {
            const updatedArticles = { ...article, paper_STATUS: event.target.value };
            const updatedArticleList = [...acceptedArticles];
            updatedArticleList[index] = updatedArticles;
            setAcceptedArticles(updatedArticleList);
        };
        return (
            <tr>
                <td>{article.published_Date}</td>
                <td>{article.paper_Title}</td>
                <td>{article.paper_Journal.journalName}</td>
                <td><button
                    className={article.paper_PDF===null?"disabled_pdf":"downloadButton"}
                    onClick={async ()=>{await handleDownloadPDF(article.paper_PDF)}
                    }>Download PDF</button></td>
                <td>
                    <InputGroup>
                        <Form.Select value={article.paper_STATUS} onChange={handleStatusChange}>
                            <option value="ACCEPTED">Accept</option>
                            <option value="REJECTED">Reject</option>
                            <option value="IN-PROGRESS">In-Progress</option>
                        </Form.Select>
                        <Button
                            variant="primary"
                            id="button-addon2"
                            onClick={async () => {
                                await handlePublisherStatusChange(article.paper_DOI, article.paper_STATUS)
                            }}
                        >
                            Update
                        </Button>
                    </InputGroup>
                </td>
            </tr>
        )
    })
    return(
            <div className={"profile-articles admin-author-update"}>
                <Form>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon2">Find</InputGroup.Text>
                        <Form.Control type="email"  placeholder="Search in Article Title and Journal "
                                      onChange={async (e) =>{
                                          await setSearchQuery(e.target.value)
                                      }}
                        />
                        <Button variant="primary" id="button-addon2"
                                onClick={async () =>{
                                    if(searchQuery.trim()===""){
                                        await getArticles(0, 10)
                                        await setPaginationStat(false)
                                    }
                                    else{
                                        await setPaginationStat(true)
                                        await getArticlesWithQuery(0, 10, searchQuery)
                                    }
                                }}
                        > Search</Button>
                    </InputGroup>
                </Form>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Year of Publish</th>
                        <th>Title</th>
                        <th>Journal</th>
                        <th>PDF</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles}
                    </tbody>
                </Table>
                <Pagination size="sm">{items}</Pagination>
            </div>
    )
}