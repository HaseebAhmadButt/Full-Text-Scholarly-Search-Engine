import React from "react";
import {Button, Form, InputGroup, Table} from "react-bootstrap";

export default function AdminDeleteArticles() {

    return (
        <div className={"profile-articles admin-author-update admin-article-delete"}>
            <h3>Delete Articles</h3>
            <Form>
                <InputGroup>
                    <Form.Select placeholder={"Search By"}>
                        <option>By Author</option>
                        <option>By Title</option>
                    </Form.Select>
                    <Form.Control type="text"  placeholder="Search By Name, or Author "/>
                    <Button variant="primary" id="button-addon2"> Search</Button>
                </InputGroup>
            </Form>

            <div className={"PersonalArticles"}>
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
                    <Button variant={"primary"} className={"remove-button"} onClick={()=>{prompt("Reason.")}}>Remove Articles</Button>
                </Form>
            </div>


        </div>

    )
}