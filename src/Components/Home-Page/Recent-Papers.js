import React, {useEffect, useState} from "react"
import '../../Styles/Home-page/Recent-Papers.css'
import Card from 'react-bootstrap/Card';
import {Button, Collapse} from "react-bootstrap";
import {getRecentArticles} from "../../Services/HomePageService/HomePageDataRetrieval";
export default function RecentPapers(){
    const [showMore, setShowMore] = useState(false);
    const [recentArticles, setRecentArticles] = useState([])
    const [recentHiddentArticles_1, setrecentHiddentArticles_1] = useState([])
    const [recentHiddentArticles_2, setrecentHiddentArticles_2] = useState([])
    useEffect(()=>{
        getRecentArticles().then(async r => {
           r.map((article, index)=>{

                if (index < 3){
                    setRecentArticles(prevState => ([...prevState, <a
                        href={article[4]===""|| article[4]==="This is random String for Link, which will be updated when URL for each Article will be created"
                                || article[4]===null? `/singlePaper/${encodeURIComponent(article[5])}`: article[4]}
                        className={"paper-anchor"}>
                        <Card>
                            <Card.Header>{article[0]}</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {article[1]}
                                </Card.Title>
                                <Card.Subtitle className={"text-muted"}>
                                    {article[2]}
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </a>]))
                }
                else if (index < 6){
                    setrecentHiddentArticles_1(prevState => ([...prevState, <a
                        href={article[4]===""|| article[4]==="This is random String for Link, which will be updated when URL for each Article will be created"
                        || article[4]===null? `/singlePaper/${encodeURIComponent(article[5])}`: article[4]}
                        className={"paper-anchor"}>
                        <Card>
                            <Card.Header>{article[0]}</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {article[1]}
                                </Card.Title>
                                <Card.Subtitle className={"text-muted"}>
                                    {article[2]}
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </a>]))
                }
                else if (index < 9){
                    setrecentHiddentArticles_2(prevState => ([...prevState, <a
                        href={article[4]===""|| article[4]==="This is random String for Link, which will be updated when URL for each Article will be created"
                        || article[4]===null? `/singlePaper/${encodeURIComponent(article[5])}`: article[4]}
                        className={"paper-anchor"}>
                        <Card>
                            <Card.Header>{article[0]}</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {article[1]}
                                </Card.Title>
                                <Card.Subtitle className={"text-muted"}>
                                    {article[2]}
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </a>]))
                }

            })
        })
    },[])

    return (
       <>
           <div className={"recent-papers"}>
               <div className={"recent-papers-heading"}>
               <h2>Recent Papers</h2>
               </div>
               <div className={"recent-papers-div"}>
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
               >{showMore ? "See Less" : "See More"}</Button>}
           </div>
       </>
    )
}