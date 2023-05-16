import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {Alert, Button, Collapse} from "react-bootstrap";
import {getRelatedArticles} from "../../Services/UserService/UserDataRetieval";
import {getTopCitedArticles} from "../../Services/HomePageService/HomePageDataRetrieval";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";
import Spinner from "react-bootstrap/Spinner";

export const RelatedArticles = ({currentPaperDOI, abstract})=>{
    const [showMore, setShowMore] = useState(false);
    const [recentArticles, setRecentArticles] = useState([])
    const [recentHiddentArticles_1, setrecentHiddentArticles_1] = useState([])
    const [recentHiddentArticles_2, setrecentHiddentArticles_2] = useState([])
    const [errors, setErrors] = useState({
        noData:false,
        serverError:false
    })
    const [animation, setAnimation] = useState(true)

    useEffect((()=>{
        const fetRelatedArticles = async ()=>{
            const ObjectBody = {
                paragraph: abstract
            }
            const relatedArticles = await getRelatedArticles(ObjectBody)
            if(relatedArticles===httpStatusNotFound||relatedArticles===httpStatusInternalServerError){
                await setErrors({noData: false, serverError: true})
            }
            else if(relatedArticles.length===0){
                await setErrors({noData: true, serverError: false})
            }
            else{
                relatedArticles.map((article, index)=>{
                    if(article.ID===currentPaperDOI) return;
                    if (index < 3){
                        setRecentArticles(prevState => ([...prevState,
                            <a
                                href={`/singlePaper/${encodeURIComponent(article.ID)}`}
                                className={"paper-anchor"}>
                                <Card>
                                    <Card.Header>
                                        {article.Title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Subtitle className={"text-muted"}>
                                            {article.Abstract.slice(0,255)}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </a>
                        ]))
                    }
                    else if (index < 6){
                        setrecentHiddentArticles_1(prevState => ([...prevState,
                            <a
                                href={`/singlePaper/${encodeURIComponent(article.ID)}`}
                                className={"paper-anchor"}>
                                <Card>
                                    <Card.Header>
                                        {article.Title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Subtitle className={"text-muted"}>
                                            {article.Abstract.slice(0,255)}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </a>
                        ]))
                    }
                    else if (index < 9){
                        setrecentHiddentArticles_2(prevState => ([...prevState,
                            <a
                                href={`/singlePaper/${encodeURIComponent(article.ID)}`}
                                className={"paper-anchor"}>
                                <Card>
                                    <Card.Header>
                                        {article.Title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Subtitle className={"text-muted"}>
                                            {article.Abstract.slice(0,255)}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </a>
                        ]))
                    }

                })

            }
        }
        fetRelatedArticles().then(()=>{setAnimation(false)})
    }), [currentPaperDOI])


    return (
        <>
            <div className={"recent-papers"}>
                <div className={"recent-papers-heading"}>
                    <h2>Related Papers</h2>
                </div>
                {animation?<Spinner className={"animation"} animation="border" variant="primary"/>:
                   <> {errors.noData?<Alert variant={"danger"}>No Data Found</Alert>:null}
                {errors.serverError?<Alert variant={"danger"}>Can't fetch Data Server Error</Alert>:null}
                { !errors.noData && !errors.serverError?
                    <><div className={"recent-papers-div"}>
                {recentArticles}
                    </div>
                    <Collapse in={showMore}>
                    <div>
                    <div className={"recent-papers-div"}>
                {recentHiddentArticles_1}
                    </div>
                    <div className={"recent-papers-div"}>
                {recentHiddentArticles_2}
                    </div>
                    </div>
                    </Collapse>
                {recentHiddentArticles_1.length===0&&recentHiddentArticles_2.length===0?null:<Button className={"more-recent-papers"}
                    onClick={() => setShowMore(!showMore)}
                    >{showMore ? "See Less" : "See More"}</Button>}</>:null}</>}
            </div>
        </>
    )
}