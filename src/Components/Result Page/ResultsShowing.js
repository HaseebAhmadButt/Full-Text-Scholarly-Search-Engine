import React, {useEffect, useState} from "react";
import '../../Styles/Result Page/ResultShowing.css';
import {Button} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import {getTopics, getAuthors, getAllArticles} from "../../Services/AuthorProfileServices/PublisherDataService"


export default function ResultsShowing({publisherData, updatingJournals}) {
    console.log(publisherData)
    const [findArticlePagination, setFindArticlePagination] = useState({
        activePage:1,
        totalPages: 1,
        totalElements:publisherData.totalElements,
        elementsPerPage:publisherData.size
    })
    const handleFindArticlePaginationClick = async (pageNumber) => {
        if(pageNumber === findArticlePagination.activePage) return;
        // const result = await getAllArticles(context.userLogIn.user_id, (pageNumber-1), findArticlePagination.elementsPerPage);
        //
        // let pages;
        // if(result.totalPages > 10){
        //     pages = 10
        // }
        // else{
        //     pages = result.totalPages
        // }
        // setFindArticlePagination(prevState => ({
        //     ...prevState,
        //     totalPages: pages,
        //     totalElements: result.totalElements,
        //     activePage: (result.pageable.pageNumber)+1,
        //     elementsPerPage: result.size
        //
        // }))
        // setData(result.content);
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
    const [articlesStat, setArticlesState] = useState([])
    useEffect(() => {
        if (publisherData && publisherData.content) {
            const articlesContent = publisherData.content.map(async (article) => {
                updatingJournals(article[5]);
                const topics = await getTopics(article[0]);
                const authors = await getAuthors(article[0]);
                return {
                    article,
                    topics,
                    authors,
                };
            });
            Promise.all(articlesContent).then((results) => {
                const articles = results.map(({ article, topics, authors }) => {
                    return (
                        <div className={"result"} key={article[0]}>
                            <div className={"result-detail"}>
                                <a href={"#"} className={"heading"}>
                                    <h3>{article[3]}</h3>
                                </a>
                                <p>{article[4]}</p>
                                {article[2] === null ? (
                                    ""
                                ) : (
                                    <a href={"#"} className={"tags"}>
                                        <span>Download PDF</span>
                                    </a>
                                )}
                                <Button
                                    className={"tags tags-button"}
                                    onClick={() => {
                                        window.open(
                                            "https://vasturiano.github.io/3d-force-graph/example/highlight/",
                                            "_blank"
                                        );
                                    }}
                                >
                                    View Graph
                                </Button>
                            </div>
                            <div className={"result-metadata"}>
                                {authors.length > 0 ? (
                                    <div>
                                        <h5 className={"heading"}>Authors: </h5>
                                        {authors.map((author) => (
                                            <a
                                                href={"/profile"}
                                                className={"authors"}
                                                key={author[0]}
                                            >
                                                <span>{author[1]}</span>
                                            </a>
                                        ))}
                                    </div>
                                ) : null}
                                <div>
                                    <h5 className={"heading heading-extra"}>Published at: </h5>
                                    <span className={"publication-site"}>
                  {article[5]} - {article[1]}
                </span>
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
            <div className={"results-showing"}>
                {articlesStat}
                <Pagination size="sm">{items}</Pagination>
            </div>

        </>
    );
}