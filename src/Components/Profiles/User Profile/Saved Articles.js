import React, {useEffect, useContext, useState} from "react";
import {Alert, Button, Form, Table} from "react-bootstrap";
import User_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
// import {getSavedArticles} from "../"
import {getSavedArticles, removeSavedArticles} from "../../../Services/AuthorProfileServices/PublisherDataService";
export default function SavedArticles() {
    const context = useContext(User_Sign_In_Context)
    const [savedArticles, setSavedArticles] = useState([])
    const [selectedArticles, setSelectedArticles] = useState([])
    const [alerts, setAlerts] = useState({
        success:false,
        error:false,
    })


    useEffect(()=>{
        getSavedArticles(context.userLogIn.user_id).then(r => setSavedArticles(r))

    },[])
    const handleSelectedArticles = async (e) =>{
            let updatedList = [...selectedArticles];
            if (e.target.checked) {
                updatedList = [...selectedArticles, e.target.value];
            } else {
                updatedList.splice(selectedArticles.indexOf(e.target.value), 1);
            }
            await setSelectedArticles(updatedList)
    }
    // console.log(selectedArticles)
    const dataRow = savedArticles.map((article)=>{
        return (
            <tr>
                <td>
                    <Form.Check
                        type={'checkbox'}
                        className={"remove-select"}
                        value={article.paperDOI}
                        onChange={async (e)=>{ await handleSelectedArticles(e)}}
                        checked={selectedArticles.includes(article.paperDOI)}
                        name={"selectedArticles"}
                    />
                </td>
                <td>
                    <div className={"result"}>
                        <div className={"result-detail"}>
                            <a href={"#"} className={"heading"}><h3>{article.paperTitle}</h3></a>
                            <p>{article.paperAbstract}</p>
                        </div>
                        <div className={"result-metadata"}>
                            {/*<div>*/}
                            {/*    <h5 className={"heading"}>Authors: </h5>*/}
                            {/*    <a href={"#"}  className={"authors"}><span> Hafiz Haseeb Ahmad Butt,</span></a>*/}
                            {/*    <a href={"#"}  className={"authors"}><span> Waleed Ahmed Shahid,</span></a>*/}
                            {/*    <a href={"#"}  className={"authors"}><span> Sanaullah Kalasra</span></a>*/}
                            {/*</div>*/}
                            <div>
                                <h5 className={"heading heading-extra"}>Published at: </h5>
                                {article.paperJournal}- {article.paperYear}
                            </div>
                            {/*<div>*/}
                            {/*    <h5 className={"heading"}>Cited By: </h5>*/}
                            {/*    <a href={"#"}  className={"authors"}><span>255</span></a>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <h5 className={"heading heading-extra"}>Topics Covered: </h5>*/}
                            {/*    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                            {/*    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                            {/*    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                            {/*    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                            {/*    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                            {/*    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                            {/*</div>*/}
                        </div>
                        {/*<Button variant={"primary"} className={"remove-button"}>Remove Articel</Button>*/}
                    </div>
                </td>
            </tr>)
    })
    const handleRemoveArticles = async () =>{
        if(selectedArticles.length <= 0){
            alert("No Article Selected.")
        }
        else{
            const data = {
                DOIs: selectedArticles,
                userID: context.userLogIn.user_id
            }

            const response = await removeSavedArticles(data)
            if(response === 200){
                await getSavedArticles(context.userLogIn.user_id).then(r => setSavedArticles(r))
                await setAlerts({success: true, error: false})
                await setSelectedArticles([])
            }
            else {
                await setAlerts({success: false, error: true})
            }
        }
    }
    return(
        <div className={"PersonalArticles saved-articles"}>
            {alerts.success?<Alert variant={"success"}>Saved Articles List Updated Successfully.</Alert>:""}
            {alerts.error?<Alert variant={"danger"}>Error in Removing Saved Articles</Alert>:""}
            <Form>
                <Form.Group controlId={"formBasicCheckbox"}>
                    <h5>Articles Selected: {selectedArticles.length}</h5>
                </Form.Group>
                <Table striped hover>
                    {dataRow}
                </Table>
                <Button
                    variant={"primary"}
                    className={"remove-button"}
                    onClick={async ()=>{
                        await handleRemoveArticles()
                    }}
                >Remove Articles</Button>
            </Form>
        </div>
    )
}