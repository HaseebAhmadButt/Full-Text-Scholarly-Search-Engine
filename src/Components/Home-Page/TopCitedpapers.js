import React, {useEffect, useState} from "react"
import '../../Styles/Home-page/Recent-Papers.css'
import Card from 'react-bootstrap/Card';
import {Alert, Button, Collapse} from "react-bootstrap";
import {getRecentArticles, getTopCitedArticles} from "../../Services/HomePageService/HomePageDataRetrieval";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";
export default function TopCitedpapers(){
    const [showCitedPapers, setshowCitedPapers] = useState(false);
    const [recentArticles, setRecentArticles] = useState([])
    const [recentHiddentArticles_1, setrecentHiddentArticles_1] = useState([])
    const [recentHiddentArticles_2, setrecentHiddentArticles_2] = useState([])
    const [errors, setErrors] = useState({
        noData:false,
        serverError:false
    })
    useEffect(()=>{
        const functionCall = async ()=>{
            return await getTopCitedArticles();
        }
        functionCall().then(async r => {
            if(r === httpStatusNotFound) {
                await setErrors({noData: true, serverError: false});
            } else if (r === httpStatusInternalServerError||r==="FETCH_ERROR") {
                await setErrors({noData: false, serverError: true});
            }
            else{
            r.map((article, index)=>{
                if (index < 3){
                    setRecentArticles(prevState => ([...prevState,
                        <a
                        href={article.paperLink ===""|| article.paperLink ==="This is random String for Link, which will be updated when URL for each Article will be created"
                        || article.paperLink ===null? `/singlePaper/${encodeURIComponent(article.paper_DOi)}`: article.paperLink}
                        className={"paper-anchor"}>
                        <Card>
                            <Card.Header>
                                {article.paperTitle} - <a href={`/results/${encodeURIComponent(article.paper_DOi)}`}>{article.totalCitations} </a> Citations
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle className={"text-muted"}>
                                    {article.paperAbstract.slice(0,255)}
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </a>
                    ]))
                }
                else if (index < 6){
                    setrecentHiddentArticles_1(prevState => ([...prevState,
                        <a
                            href={article.paperLink ===""|| article.paperLink ==="This is random String for Link, which will be updated when URL for each Article will be created"
                            || article.paperLink ===null? `/singlePaper/${encodeURIComponent(article.paper_DOi)}`: article.paperLink}
                            className={"paper-anchor"}
                        >
                            <Card>
                                <Card.Header>
                                    {article.paperTitle} - <a href={`/results/${encodeURIComponent(article.paper_DOi)}`}>{article.totalCitations} </a> Citations
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className={"text-muted"}>
                                        {article.paperAbstract.slice(0,255)}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </a>
                    ]))
                }
                else if (index < 9){
                    setrecentHiddentArticles_2(prevState => ([...prevState,
                        <a
                            href={article.paperLink ===""|| article.paperLink ==="This is random String for Link, which will be updated when URL for each Article will be created"
                            || article.paperLink ===null? `/singlePaper/${encodeURIComponent(article.paper_DOi)}`: article.paperLink}
                            className={"paper-anchor"}>
                            <Card>
                                <Card.Header>
                                    {article.paperTitle} - <a href={`/results/${encodeURIComponent(article.paper_DOi)}`}>{article.totalCitations} </a> Citations
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className={"text-muted"}>
                                        {article.paperAbstract.slice(0,255)}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </a>
                    ]))
                }

            })}
        })
    },[])

    return (
        <>
            <div className={"recent-papers"}>
                <div className={"recent-papers-heading"}>
                    <h2>Most Cited Papers</h2>
                </div>
                {errors.noData?<Alert variant={"danger"}>No Data Found</Alert>:null}
                {errors.serverError?<Alert variant={"danger"}>Can't fetch Data Server Error</Alert>:null}
                { !errors.noData && !errors.serverError?
                    <><div className={"recent-papers-div"}>
                    {recentArticles}
                </div>
                <Collapse in={showCitedPapers}>
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
                         onClick={() => setshowCitedPapers(!showCitedPapers)}
                >{showCitedPapers ? "See Less" : "See More"}</Button>}</>:null}
            </div>
        </>
    )
}