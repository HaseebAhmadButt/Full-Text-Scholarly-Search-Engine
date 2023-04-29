import React, {useEffect, useContext, useState} from "react";
import {Alert, Button, Form, Table} from "react-bootstrap";
import User_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
// import {getSavedArticles} from "../"
import {
    getAuthors,
    getSavedArticles,
    getTopics,
    removeSavedArticles
} from "../../../Services/AuthorProfileServices/PublisherDataService";
export default function SavedArticles() {
    const context = useContext(User_Sign_In_Context)
    const [savedArticles, setSavedArticles] = useState([])
    const [selectedArticles, setSelectedArticles] = useState([])
    const [alerts, setAlerts] = useState({
        success:false,
        error:false,
    })
    useEffect(() => {
        getSavedArticles(context.userLogIn.user_id).then((articles) => {
            const articlesContent = articles.map(async (article) => {
                const topics = await getTopics(article.paperDOI);
                const authors = await getAuthors(article.paperDOI);
                return {
                    article,
                    topics,
                    authors,
                };
            });
            Promise.all(articlesContent).then((results) => {
                const articles = results.map(({ article, topics, authors }) => {
                    return (
                        <tr>
                            <td>
                                <Form.Check
                                    type={'checkbox'}
                                    className={'remove-select'}
                                    value={article.paperDOI}
                                    onChange={async (e) => {
                                        await handleSelectedArticles(e);
                                    }}
                                    checked={selectedArticles.includes(article.paperDOI)}
                                    name={'selectedArticles'}
                                />
                            </td>
                            <td>
                                <div className={'result'}>
                                    <div className={'result-detail'}>
                                        <a href={'#'} className={'heading'}>
                                            <h3>{article.paperTitle}</h3>
                                        </a>
                                        <p>{article.paperAbstract}</p>
                                        <a href={"#"} className={article.paperPDF===null?"disabled":"tags"}>
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
                                    <div className={'result-metadata'}>
                                        {authors && authors.length>0? (
                                            <div>
                                                <h5 className={'heading'}>Authors: </h5>
                                                {authors.map((author) => (
                                                    <a href={`/profile/${author[0]}`} className={'authors'}>
                                                        <span>{author[1]},</span>
                                                    </a>
                                                ))}
                                            </div>
                                        ):null}
                                        <div>
                                            <h5 className={'heading heading-extra'}>Published at: </h5>
                                            {article.paperJournal} - {article.paperYear}
                                        </div>
                                        {topics && topics.length > 0? (
                                            <div>
                                                <h5 className={'heading heading-extra'}>Topics Covered: </h5>
                                                {topics.map((topic) => (
                                                    <a href={'#'} className={'tags'}>
                                                        <span>{topic}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        ):null}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                });
                setSavedArticles(articles);
            });
        });
    }, []);
    const handleSelectedArticles = async (e) =>{
            let updatedList = [...selectedArticles];
            if (e.target.checked) {
                updatedList = [...selectedArticles, e.target.value];
            } else {
                updatedList.splice(selectedArticles.indexOf(e.target.value), 1);
            }
            await setSelectedArticles(updatedList)
    }
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
                    {savedArticles}
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