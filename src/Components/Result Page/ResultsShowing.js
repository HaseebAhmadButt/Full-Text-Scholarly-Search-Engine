import React, {useEffect, useState} from "react";
import '../../Styles/Result Page/ResultShowing.css';
import {Button, Form} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import {getTopics, getAuthors} from "../../Services/AuthorProfileServices/PublisherDataService"
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
                                    <a href={"#"} className={article[2] === null?"disabled":"tags"}>
                                        <span>Download PDF</span>
                                    </a>

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