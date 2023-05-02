import React, {useEffect, useContext, useState} from "react";
import {Alert, Button, Form, Table} from "react-bootstrap";
import User_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
// import {getSavedArticles} from "../"
import {
    getAuthors, getCitations,
    getSavedArticles,
    getTopics,
    removeSavedArticles
} from "../../../Services/AuthorProfileServices/PublisherDataService";
import {downloadPDF} from "../../../Services/AdminService/DataRetrievalMethods";
export default function SavedArticles() {
    const context = useContext(User_Sign_In_Context)
    const [savedArticles, setSavedArticles] = useState([])
    const [selectedArticles, setSelectedArticles] = useState([])
    const [alerts, setAlerts] = useState({
        success:false,
        error:false,
    })
    const handleDownloadPDF = async (pdfAddress) => {
        try {
            const blob = await downloadPDF(pdfAddress);
            // const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);
            window.open(pdfUrl, '_blank'); // Open PDF in a new tab
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSavedArticles(context.userLogIn.user_id).then((articles) => {
            const articlesContent = articles.map(async (article) => {
                const topics = await getTopics(article.paperDOI);
                const authors = await getAuthors(article.paperDOI);
                const citations = await getCitations(article[0])

                return {
                    article,
                    topics,
                    authors,
                    citations

                };
            });
            Promise.all(articlesContent).then((results) => {
                const articles = results.map(({ article, topics, authors, citations }) => {
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
                                        <a href={`/singlePaper/${encodeURIComponent(article.paperDOI)}`}
                                           className={"heading"}
                                           target={"_blank"}
                                        >
                                            <h3>{article.paperTitle}</h3>
                                        </a>
                                        <p>{article.paperAbstract}</p>
                                        {/*<a href={"#"} className={article.paperPDF===null?"disabled":"tags"}>*/}
                                        {/*    <span>Download PDF</span>*/}
                                        {/*</a>*/}
                                        <button
                                            className={article.paperPDF===null || article.paperPDF === "" || article.paperPDF === undefined?"disabled_pdf":"downloadButton tags"}
                                            onClick={async ()=>{await handleDownloadPDF(article.paperPDF)}}>
                                            Download PDF
                                        </button>
                                        <Button
                                            className={"tags tags-button"}
                                            onClick={() => {
                                                window.open(
                                                    `/graph/${encodeURIComponent(article.paperDOI)}`,
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
                                        <div>
                                            <h5 className={"heading heading-extra"}>Citations: </h5>
                                            <a href={`results/${encodeURIComponent(article[0])}`} className={"publication-site"} target={"_blank"}>{citations[0].length}</a>
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