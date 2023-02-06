import React from "react";
import {Nav, Button, Form, Table, InputGroup, FormCheck} from "react-bootstrap";
// import {Button} from "@chakra-ui/react";

export default function ProfileArticles() {
    const [key, setKey] = React.useState({
        personalArticles: true,
        addArticle: false,
        findArticle: false,
    });

    const showTabData = (key) => {
        if (key === "link-1") {
            setKey({
                personalArticles: true,
                addArticle: false,
                findArticle: false,
            })
        } else if (key === "link-2") {
            setKey({
                personalArticles: false,
                addArticle: true,
                findArticle: false,
            })
        } else if (key === "link-3") {
            setKey({
                personalArticles: false,
                addArticle: false,
                findArticle: true,
            })
        }
    }

    return(
        <div className={"profile-articles"}>
            <h3>Research Work Information</h3>
            <div>
                <Nav fill variant={"tabs"} defaultActiveKey={"link-1"} onSelect={showTabData} style={{borderBottom:"unset"}}>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" className={"Tab-Option"}>Personal Articles</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" className={"Tab-Option"}>Add Article</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-3" className={"Tab-Option"}>Find Article</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div>
                {key.personalArticles?<div className={"PersonalArticles"}>
                        <Form>
                            <Form.Group controlId={"formBasicCheckbox"}>
                                <h5>Articles Selected: 0</h5>
                                <Form.Check type={"checkbox"} label={"Select All"}/>
                            </Form.Group>
                            <Table striped hover>
                                <tr>
                                    <td>
                                        <Form.Check type={'checkbox'} className={"remove-select"}/>
                                    </td>
                                    <td>
                                        <div className={"result"}>
                                            <div className={"result-detail"}>
                                                <a href={"#"} className={"heading"}><h3>Energy and policy considerations for deep learning in NLP</h3></a>
                                                <p>Deep learning has revolutionized natural language processing (NLP), but its energy consumption is a growing concern. We present a comprehensive study of the energy consumption of deep learning models for NLP and discuss the implications for the field.</p>
                                            </div>
                                            <div className={"result-metadata"}>
                                                <div>
                                                    <h5 className={"heading"}>Authors: </h5>
                                                    <a href={"#"}  className={"authors"}><span> Hafiz Haseeb Ahmad Butt,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Waleed Ahmed Shahid,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Sanaullah Kalasra</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Published at: </h5>
                                                    IEEE Computational intelligence - 2014 <a href={"#"}  className={"authors"}><span>ieeexplore.ieee.org</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading"}>Cited By: </h5>
                                                    <a href={"#"}  className={"authors"}><span>255</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                </div>
                                            </div>
                                            {/*<Button variant={"primary"} className={"remove-button"}>Remove Articel</Button>*/}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Check type={'checkbox'} className={"remove-select"}/>
                                    </td>
                                    <td>
                                    <div className={"result"}>
                                            <div className={"result-detail"}>
                                                <a href={"#"} className={"heading"}><h3>Energy and policy considerations for deep learning in NLP</h3></a>
                                                <p>Deep learning has revolutionized natural language processing (NLP), but its energy consumption is a growing concern. We present a comprehensive study of the energy consumption of deep learning models for NLP and discuss the implications for the field.</p>
                                            </div>
                                            <div className={"result-metadata"}>
                                                <div>
                                                    <h5 className={"heading"}>Authors: </h5>
                                                    <a href={"#"}  className={"authors"}><span> Hafiz Haseeb Ahmad Butt,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Waleed Ahmed Shahid,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Sanaullah Kalasra</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Published at: </h5>
                                                    IEEE Computational intelligence - 2014 <a href={"#"}  className={"authors"}><span>ieeexplore.ieee.org</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading"}>Cited By: </h5>
                                                    <a href={"#"}  className={"authors"}><span>255</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </Table>
                            <Button variant={"primary"} className={"remove-button"}>Remove Articles</Button>
                        </Form>
                    </div> :""}
                {key.addArticle?<div>
                        <Form>
                            <InputGroup className={"profile-articles-finding"}>
                                <Form.Control className={"search-input-finding"} type="file" placeholder="Search" />
                                <Button type={"submit"} variant={"primary"} className={"search-button-finding"}>Upload</Button>
                            </InputGroup>
                        </Form>
                        <Form>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th><FormCheck type={"checkbox"} label={"Select All"}/></th>
                                    <th>Date of Upload</th>
                                    <th>Title</th>
                                    <th>Authors</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><FormCheck type={"checkbox"} label={"Select"}/></td>
                                    <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                                    <td>Energy and policy considerations for deep learning in NLP</td>
                                    <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                                    <td>Waiting</td>
                                </tr>
                                <tr>
                                    <td><FormCheck type={"checkbox"} label={"Select"}/></td>
                                    <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                                    <td>Energy and policy considerations for deep learning in NLP</td>
                                    <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                                    <td>In Progress</td>
                                </tr>
                                <tr>
                                    <td><FormCheck type={"checkbox"} label={"Select"}/></td>
                                    <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                                    <td>Energy and policy considerations for deep learning in NLP</td>
                                    <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                                    <td>Rejected</td>
                                </tr>
                                <tr>
                                    <td><FormCheck type={"checkbox"} label={"Select"}/></td>
                                    <td>{(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear()}</td>
                                    <td>Energy and policy considerations for deep learning in NLP</td>
                                    <td>Hafiz Haseeb Ahmad Butt, Waleed Ahmed Shahid, Sanaullah Kalasra</td>
                                    <td>Accepted</td>
                                </tr>
                                </tbody>
                            </Table>
                            <Button variant={"primary"} className={"remove-button"}>Remove Selected Articles</Button>
                        </Form>
                    </div>:""}
                {key.findArticle? <div>
                        <Form>
                            <InputGroup className={"profile-articles-finding"}>
                                <Form.Select aria-label="Default select example"  className={"form-select-finding"}>
                                    <option>Search By</option>
                                    <option value="1">Title</option>
                                    <option value="2">Author</option>
                                </Form.Select>
                                <Form.Control className={"search-input-finding"} type="text" placeholder="Search" />
                                <Button type={"submit"} variant={"primary"} className={"search-button-finding"}>Search</Button>
                            </InputGroup>
                        </Form>
                        <div>
                            <Form>
                                <Form.Group controlId={"formBasicCheckbox"}>
                                    <h5>Articles Selected: 0</h5>
                                </Form.Group>
                            <Table className={"profile-articles-finding-table"}>
                                <tr>
                                    <td>
                                        <Form.Check type={'checkbox'} className={"remove-select"}/>
                                    </td>
                                    <td>
                                        <div className={"result"}>
                                            <div className={"result-detail"}>
                                                <a href={"#"} className={"heading"}><h3>Energy and policy considerations for deep learning in NLP</h3></a>
                                                <p>Deep learning has revolutionized natural language processing (NLP), but its energy consumption is a growing concern. We present a comprehensive study of the energy consumption of deep learning models for NLP and discuss the implications for the field.</p>
                                            </div>
                                            <div className={"result-metadata"}>
                                                <div>
                                                    <h5 className={"heading"}>Authors: </h5>
                                                    <a href={"#"}  className={"authors"}><span> Hafiz Haseeb Ahmad Butt,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Waleed Ahmed Shahid,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Sanaullah Kalasra</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Published at: </h5>
                                                    IEEE Computational intelligence - 2014 <a href={"#"}  className={"authors"}><span>ieeexplore.ieee.org</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading"}>Cited By: </h5>
                                                    <a href={"#"}  className={"authors"}><span>255</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <Form.Check type={'checkbox'} className={"remove-select"}/>
                                    </td>
                                    <td>
                                        <div className={"result"}>
                                            <div className={"result-detail"}>
                                                <a href={"#"} className={"heading"}><h3>Energy and policy considerations for deep learning in NLP</h3></a>
                                                <p>Deep learning has revolutionized natural language processing (NLP), but its energy consumption is a growing concern. We present a comprehensive study of the energy consumption of deep learning models for NLP and discuss the implications for the field.</p>
                                            </div>
                                            <div className={"result-metadata"}>
                                                <div>
                                                    <h5 className={"heading"}>Authors: </h5>
                                                    <a href={"#"}  className={"authors"}><span> Hafiz Haseeb Ahmad Butt,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Waleed Ahmed Shahid,</span></a>
                                                    <a href={"#"}  className={"authors"}><span> Sanaullah Kalasra</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Published at: </h5>
                                                    IEEE Computational intelligence - 2014 <a href={"#"}  className={"authors"}><span>ieeexplore.ieee.org</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading"}>Cited By: </h5>
                                                    <a href={"#"}  className={"authors"}><span>255</span></a>
                                                </div>
                                                <div>
                                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                    <a href={"#"} className={'tags'}><span >NLP</span></a>
                                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </Table>
                                <Button variant={"primary"} className={"remove-button"}>Add Articles</Button>
                            </Form>

                        </div>
                    </div>
                    :""}
            </div>
        </div>
    )
}