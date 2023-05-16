import React, {useEffect, useState} from "react";
import '../../Styles/Result Page/ResultShowing.css';
import {Button, Form} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import {getTopics, getAuthors, getCitations} from "../../Services/AuthorProfileServices/PublisherDataService"
import {downloadPDF} from "../../Services/AdminService/DataRetrievalMethods";
import {useNavigate} from "react-router-dom";
// /getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter


export default function UserResultPage({publisherData, updatingJournals, loadNewPage, fetchSearchArticles, changePaper, currentDOI}) {
    const navigator = useNavigate()
    const [findArticlePagination, setFindArticlePagination] = useState({
        activePage:1,
        totalPages: 0,
        totalElements: 0,
        elementsPerPage:0
    })
    const [articlesStat, setArticlesState] = useState([])
    const handleFindArticlePaginationClick = async (pageNumber) => {
        if(pageNumber === findArticlePagination.activePage) return;
            await fetchSearchArticles((pageNumber - 1), findArticlePagination.elementsPerPage)
    };
    let items = [];
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

    const handleNavigation = (topic)=>{
        navigator(`/search/results/${topic}`)
    }
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
        const fetCitations = async ()=>{
            const articlesContent = publisherData.content.map(async (article) => {
                if(article.paper_DOI===currentDOI) return;
                const topics = await getTopics(article.paper_DOI);
                const authors = await getAuthors(article.paper_DOI);
                const citations = await getCitations(article.paper_DOI)
                return {
                    article,
                    topics,
                    authors,
                    citations
                };
            });
            return await Promise.all(articlesContent).then((results) => {
                return results.map(({ article, topics, authors, citations }) => {
                    if(article.paper_DOI===currentDOI) {
                        return ([])
                    }
                    return (
                        <div className={"result"} key={article.paper_DOI}>
                            <div className={"result-detail"}>
                                <a
                                    href={`/singlePaper/${encodeURIComponent(article.paper_DOI)}`}
                                    className={"heading"}
                                >
                                    <h3
                                        target={"_blank"}
                                        onClick={async ()=>{
                                            // navigator(`/singlePaper/${encodeURIComponent(article.paper_DOI)}`)
                                            // await changePaper(article.paper_DOI)
                                        }}
                                    >{article.paper_Title}</h3>
                                </a>
                                <p>{article.paper_Abstract.slice(0, 255)}</p>
                                <button
                                    className={article.paper_PDF===null || article.paper_PDF === "" || article.paper_PDF === undefined?"disabled_pdf":"downloadButton tags"}
                                    onClick={async ()=>{await handleDownloadPDF(article.paper_PDF)}}>
                                    Download PDF
                                </button>

                                <Button
                                    className={"tags tags-button"}
                                    onClick={() => {
                                        window.open(
                                            `/graph/${encodeURIComponent(article.paper_DOI)}`,
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
                                        <span
                                            className={"authors"}
                                            key={author[0]}
                                            onClick={()=>{
                                                navigator(`/profile/${author[0]}`)
                                            }}
                                        >{author[1]}</span>
                                    ))}
                                </div>) : null}
                                <div>
                                    <h5 className={"heading heading-extra"}>Published at: </h5>
                                    <span className={"publication-site"}>{article.paper_Journal.journalName} - {article.published_Date}</span>
                                </div>
                                <h5 className={"heading heading-extra"}>Citations: </h5>
                                {citations[0].length !==0 ?<div>
                                    <a href={`/results/${encodeURIComponent(article.paper_DOI)}`}
                                       className={"publication-site"} target={"_blank"}>{citations[0].length}</a>
                                </div>:<><a className={"publication-site"} >{citations[0].length} </a></>}
                                <div>
                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                    {topics.map((topic) => (
                                        <a>
                                            <span
                                                className={"tags"}
                                                key={topic}
                                                onClick={()=>{handleNavigation(topic)}}
                                            >{topic}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                });
            });
        }

        if (publisherData && publisherData.content) {

            fetCitations().then(async (r)=>{
                await setArticlesState(r);
            })
        }
        else{
            setArticlesState([]);
        }
    }, [publisherData]);
    return (
        <>
            <div className={"results-showing"}>
                {articlesStat}
                <Pagination size="sm">{items}</Pagination>
            </div>

        </>
    );
}

