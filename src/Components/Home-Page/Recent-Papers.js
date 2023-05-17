import React, {useEffect, useState} from "react"
import '../../Styles/Home-page/Recent-Papers.css'
import Card from 'react-bootstrap/Card';
import {Alert, Button, Collapse} from "react-bootstrap";
import {getRecentArticles} from "../../Services/HomePageService/HomePageDataRetrieval";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";
export default function RecentPapers(){
    const [showMore, setShowMore] = useState(false);
    const [recentArticles, setRecentArticles] = useState([])
    const [recentHiddentArticles_1, setrecentHiddentArticles_1] = useState([])
    const [recentHiddentArticles_2, setrecentHiddentArticles_2] = useState([])
    const [errors, setErrors] = useState({
        noData:false,
        serverError:false
    })
    useEffect(()=>{

        const functionCall = async ()=>{
            return await getRecentArticles();
        }
        functionCall().then(async (response) => {
            if(response === httpStatusNotFound) {
                await setErrors({noData: true, serverError: false});
            } else if (response === httpStatusInternalServerError||response==="FETCH_ERROR") {
                await setErrors({noData: false, serverError: true});
            } else {
                response.map((article, index)=>{
                    if (index < 3){
                        setRecentArticles(prevState => ([...prevState, <a href={article[3]===""|| article[3]===null|| article[3]===undefined? `/singlePaper/${encodeURIComponent(article[4])}`: article[3]}
                            className={"paper-anchor"}>
                            <Card>
                                {/*<Card.Header>{article[0]}</Card.Header>*/}
                                <Card.Header>{article[1]}</Card.Header>
                                <Card.Body>
                                    {/*<Card.Title>*/}
                                    {/*    {article[1]}*/}
                                    {/*</Card.Title>*/}
                                    <Card.Subtitle className={"text-muted"}>
                                        {article[2].slice(0, 255)}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </a>]))
                    }
                    else if (index < 6){
                        setrecentHiddentArticles_1(prevState => ([...prevState, <a
                            href={article[3]===""|| article[3]===null|| article[3]===undefined? `/singlePaper/${encodeURIComponent(article[4])}`: article[3]}
                            className={"paper-anchor"}>
                            <Card>
                                {/*//<Card.Header>{article[0]}</Card.Header>*/}
                                <Card.Header>{article[1]}</Card.Header>

                                <Card.Body>
                                    {/*<Card.Title>*/}
                                    {/*    {article[1]}*/}
                                    {/*</Card.Title>*/}
                                    <Card.Subtitle className={"text-muted"}>
                                        {article[2].slice(0, 255)}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </a>]))
                    }
                    else if (index < 9){
                        setrecentHiddentArticles_2(prevState => ([...prevState,
                            <a
                                href={article[3]===""|| article[3]===null|| article[3]===undefined?`/singlePaper/${encodeURIComponent(article[4])}`: article[3]}
                                className={"paper-anchor"}>
                                <Card>
                                    {/*//<Card.Header>{article[0]}</Card.Header>*/}
                                    <Card.Header>{article[1]}</Card.Header>

                                    <Card.Body>
                                        {/*<Card.Title>*/}
                                        {/*    {article[1]}*/}
                                        {/*</Card.Title>*/}
                                        <Card.Subtitle className={"text-muted"}>
                                            {article[2].slice(0, 255)}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </a>]))
                    }

                })
            }
        })

    },[])

    return (
       <>

         <div className={"recent-papers"}>
               <div className={"recent-papers-heading"}>
                   <h2>Recent Papers</h2>
               </div>
               {errors.noData?<Alert variant={"danger"}>No Data Found</Alert>:null}
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
             {recentHiddentArticles_1.length === 0 && recentHiddentArticles_2.length === 0 ? null : <Button className={"more-recent-papers"} onClick={() => setShowMore(!showMore)}>{showMore ? "See Less" : "See More"}</Button>}
             </>:null}</div>
       </>
    )
}