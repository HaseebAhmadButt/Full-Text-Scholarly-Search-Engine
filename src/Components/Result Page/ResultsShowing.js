import React, {useEffect, useState} from "react";
import '../../Styles/Result Page/ResultShowing.css';
import {Button, Form} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import {getTopics, getAuthors, getCitations} from "../../Services/AuthorProfileServices/PublisherDataService"
import {downloadPDF} from "../../Services/AdminService/DataRetrievalMethods";
// /getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter


export default function ResultsShowing({publisherData, updatingJournals, loadNewPage, fetchSearchArticles}) {
    const [findArticlePagination, setFindArticlePagination] = useState({
        activePage:1,
        totalPages: 0,
        totalElements: 0,
        elementsPerPage:0
    })
    const [articlesStat, setArticlesState] = useState([])
    const [formState, setFormStat] = useState("")
    const [searchPagination, setSearchPagination] = useState(false)
    const handleFindArticlePaginationClick = async (pageNumber) => {
        if(pageNumber === findArticlePagination.activePage) return;
        if(!searchPagination){
            loadNewPage((pageNumber - 1), findArticlePagination.elementsPerPage)
        }
        else{
            await fetchSearchArticles((pageNumber - 1), findArticlePagination.elementsPerPage, formState)
        }
    };
    let items = [];
    let list = []
    for (let number = 1; number <= findArticlePagination.totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === findArticlePagination.activePage}
                onClick={async () => await handleFindArticlePaginationClick(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }
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
    useEffect(() => {
        let pages;
        if(publisherData.totalPages > 10){
            pages = 10
        }
        else{
            pages = publisherData.totalPages
        }
        setFindArticlePagination({
            activePage: publisherData.pageable ? publisherData.pageable.pageNumber + 1 : 1,
            totalPages: pages,
            totalElements: publisherData.totalElements,
            elementsPerPage: publisherData.size
        });
        if (publisherData && publisherData.content) {
            const articlesContent = publisherData.content.map(async (article) => {
                // updatingJournals(article[5]);
                const topics = await getTopics(article[0]);
                const authors = await getAuthors(article[0]);
                const citations = await getCitations(article[0])
                return {
                    article,
                    topics,
                    authors,
                    citations
                };
            });
            Promise.all(articlesContent).then((results) => {
                const articles = results.map(({ article, topics, authors, citations }) => {
                    // console.log("ResultShowing Component: ", article)
                    return (
                        <div className={"result"} key={article[0]}>
                            <div className={"result-detail"}>
                                <a href={`/singlePaper/${encodeURIComponent(article[0])}`} className={"heading"} target={"_blank"}>
                                    <h3>{article[3]}</h3>
                                </a>
                                <p>{article[4]}</p>
                                <button
                                    className={article[2]===null || article[2] === "" || article[2] === undefined?"disabled_pdf":"downloadButton tags"}
                                    onClick={async ()=>{await handleDownloadPDF(article[2])}}>
                                    Download PDF
                                </button>

                                <Button
                                    className={"tags tags-button"}
                                    onClick={() => {
                                        window.open(
                                            `/graph/${encodeURIComponent(article[0])}`,
                                            "_blank"
                                        );
                                    }}
                                >
                                    View Graph
                                </Button>
                            </div>
                            <div className={"result-metadata"}>
                                {authors.length > 0 ? (<div>
                                        <h5 className={"heading"}>Authors: </h5>
                                        {authors.map((author) => (
                                            <a
                                                href={`/profile/${encodeURIComponent(author[0])}`}
                                                className={"authors"}
                                                key={author[0]}
                                            >
                                                <span>{author[1]}</span>
                                            </a>
                                        ))}
                                    </div>) : null}
                                <div>
                                    <h5 className={"heading heading-extra"}>Published at: </h5>
                                    <span className={"publication-site"}>{article[5]} - {article[1]}</span>
                                </div>
                                <div>
                                    <h5 className={"heading heading-extra"}>Citations: </h5>
                                    <a href={`results/${encodeURIComponent(article[0])}`} className={"publication-site"} target={"_blank"}>{citations[0].length}</a>
                                </div>
                                <div>
                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                    {topics.map((topic) => (
                                        <a href={"/results"} className={"tags"} key={topic}>
                                            <span>{topic}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                });
                setArticlesState(articles);
            });
        }
    }, [publisherData]);
    return (
        <>
            <div className={"result-profile-filters"}>
                <Form.Group controlId="formBasicDate" className={"middle-search-form advance-form-group filter-search-group"}>
                    <Form.Control
                        type="text"
                        placeholder="Search Paper Title OR Abstract"
                        className={"middle-search-input filter-search"}
                        onChange={async (e)=>{ await setFormStat(e.target.value)}}
                        value={formState}
                    />
                    <Button
                        type="submit"
                        onClick={async ()=>{
                            if(formState.trim()===""){
                                loadNewPage(0, 10)
                                await setSearchPagination(false)
                            }
                            else{
                                await fetchSearchArticles(0,10, formState)
                                await setSearchPagination(true)
                            }
                        }}
                        className={"middle-search-button filter-search-button"}>Search</Button>
                </Form.Group>
            </div>
            <div className={"results-showing"}>
                {articlesStat}
                <Pagination size="sm">{items}</Pagination>
            </div>

        </>
    );
}