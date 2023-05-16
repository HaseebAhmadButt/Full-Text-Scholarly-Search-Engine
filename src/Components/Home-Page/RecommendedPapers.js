import React from "react"
import '../../Styles/Home-page/Recent-Papers.css'
import Card from 'react-bootstrap/Card';
import {Button, Collapse} from "react-bootstrap";
export default function RecentPapers(){
    const [showMore, setShowMore] = React.useState(false);

    return (
        <>
            <div className={"recent-papers"}>
                <div className={"recent-papers-heading"}>
                    <h2>Recommended Papers</h2>
                </div>
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
                            </Card.Body>
                        </Card>
                    </a>
                </div>
                <Collapse in={showMore}>
                    <div>
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
                                    </Card.Body>
                                </Card>
                            </a>
                        </div>
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
                                    </Card.Body>
                                </Card>
                            </a>
                        </div>
                    </div>
                </Collapse>
                <Button className={"more-recent-papers"}
                        onClick={() => setShowMore(!showMore)}
                >{showMore? "See Less": "See More"}</Button>
            </div>
        </>
    )
}