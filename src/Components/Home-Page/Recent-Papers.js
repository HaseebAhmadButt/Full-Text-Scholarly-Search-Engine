import React from "react"
import '../../Styles/Home-page/Recent-Papers.css'
import Card from 'react-bootstrap/Card';
export default function RecentPapers(){
    const date = (new Date()).getDate()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getFullYear()
    return (
       <>
           <div className={"recent-papers"}>
               <h2>Recent Papers</h2>
               <div className={"recent-papers-div"}>
                    <a href={"#"} className={"paper-anchor"}>
                        <Card>
                            <Card.Header>Natural Language Processing</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    Energy and policy considerations for deep learning in NLP
                                </Card.Title>
                                <Card.Subtitle className={"text-muted"}>
                                    Recent progress in hardware and methodology for training neural networks has ushered in a new generation of large networks trained on abundant data. These models have obtained notable gains in accuracy across many NLP tasks. However, these accuracy improvements depend on the availability of exceptionally large computational resources that necessitate similarly substantial energy consumption.
                                </Card.Subtitle>
                                {/*<br />*/}
                                {/*<Card.Text>*/}
                                {/*    {date}*/}
                                {/*</Card.Text>*/}
                                {/*<Card.Link href="#">Open</Card.Link>*/}
                            </Card.Body>
                         </Card>
                    </a>
                   <a href={"#"} className={"paper-anchor"}>
                       <Card>
                           <Card.Header>Natural Language Processing</Card.Header>
                           <Card.Body>
                               <Card.Title>
                                   Energy and policy considerations for deep learning in NLP
                               </Card.Title>
                               <Card.Subtitle className={"text-muted"}>
                                   Recent progress in hardware and methodology for training neural networks has ushered in a new generation of large networks trained on abundant data. These models have obtained notable gains in accuracy across many NLP tasks. However, these accuracy improvements depend on the availability of exceptionally large computational resources that necessitate similarly substantial energy consumption.
                               </Card.Subtitle>
                               {/*<br />*/}
                               {/*<Card.Text>*/}
                               {/*    {date}*/}
                               {/*</Card.Text>*/}
                               {/*<Card.Link href="#">Open</Card.Link>*/}
                           </Card.Body>
                       </Card>
                   </a>
                   <a href={"#"} className={"paper-anchor"}>
                       <Card>
                           <Card.Header>Natural Language Processing</Card.Header>
                           <Card.Body>
                               <Card.Title>
                                   Energy and policy considerations for deep learning in NLP
                               </Card.Title>
                               <Card.Subtitle className={"text-muted"}>
                                   Recent progress in hardware and methodology for training neural networks has ushered in a new generation of large networks trained on abundant data. These models have obtained notable gains in accuracy across many NLP tasks. However, these accuracy improvements depend on the availability of exceptionally large computational resources that necessitate similarly substantial energy consumption.
                               </Card.Subtitle>
                               {/*<br />*/}
                               {/*<Card.Text>*/}
                               {/*    {date}*/}
                               {/*</Card.Text>*/}
                               {/*<Card.Link href="#">Open</Card.Link>*/}
                           </Card.Body>
                       </Card>
                   </a>
               </div>
               <a href={"#"} className={"more-recent-papers"}><h4>See More</h4></a>
           </div>
       </>
    )
}