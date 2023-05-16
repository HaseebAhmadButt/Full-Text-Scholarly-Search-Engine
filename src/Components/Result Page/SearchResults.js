import {useNavigate} from "react-router-dom";
import {Alert, Button, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {downloadPDF} from "../../Services/AdminService/DataRetrievalMethods";
import Pagination from "react-bootstrap/Pagination";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {saveArticle} from "../../Services/UserService/UserSearchService";
import {httpStatusInternalServerError} from "../../Services/apiConstants";


export const SearchResults = ({allData, sortedDate,
                                  sortCitations, enableCitaionSort,
                                  enableDateSort, sortByCitationsAndDate,
                                  rangedDocuments, inRangeArticlesFlag,
                                  selectedJournalFlag, selectedJournalArticles,
                                  notFoundError, serverError, changeStat}) =>{
    // console.log(rangedDocuments.length)
    const context = useContext(User_Sign_In_Context)
    console.log(context)
    const navigator = useNavigate()
    const [Data, setData] = useState([])
    const [citedData, setCitedData] = useState([])
    const [dateData, setDateData] = useState([])
    const [bothCitations, setBothCitations] = useState([])
    const [rangeDocuments, setRangeDocuments] = useState([])
    const [selectedJournalArticle, setSelectedJournalArticle] = useState([])
    const [pagination, setPagination] = useState({
        totalPages:1,
        currentPage:1,
        totalElements:10
    })
    const [rangedPagination, setRangedPagination] = useState({
        totalPages:1,
        currentPage:1,
        totalElements:10
    })
    const [selectedJournalPagination, setSelectedJournalPagination] = useState({
        totalPages:1,
        currentPage:1,
        totalElements:10
    })
    // const [savedArticleIds, setSavedArticleIds] = useState(new Set());
    // const [savedArticleIds, setSavedArticleIds] = useState(new Set(context.userLogIn.savedArticles.map(article => article)));
    const [savedArticleIds, setSavedArticleIds] = useState(new Set(context.userLogIn.savedArticles ? context.userLogIn.savedArticles.map(article => article) : []));

    console.log(savedArticleIds)
    const handlePaginationClick = (number, flag)=>{
        if(flag==="Ranged") {
            if (number === rangedPagination.currentPage) return
            setRangedPagination(prevState => ({...prevState, currentPage: number}))
        }
        else if(flag==="SelectedJournal"){
            if (number === selectedJournalPagination.currentPage) return
            setSelectedJournalPagination(prevState => ({...prevState, currentPage: number}))
        }
        else{
            if (number === pagination.currentPage) return
            setPagination(prevState => ({...prevState, currentPage: number}))
        }
    }
    let items = [];
    let rangedList = [];
    let selectedJournalList = [];
    for (let number = 1; number <= pagination.totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === pagination.currentPage}
                onClick={async () => await handlePaginationClick(number, "Else")}
            >
                {number}
            </Pagination.Item>,
        );
    }
    for (let number = 1; number <= rangedPagination.totalPages; number++) {
        rangedList.push(
            <Pagination.Item
                key={number}
                active={number === rangedPagination.currentPage}
                onClick={async () => await handlePaginationClick(number, "Ranged")}
            >
                {number}
            </Pagination.Item>,
        );
    }
    for (let number = 1; number <= selectedJournalPagination.totalPages; number++) {
        selectedJournalList.push(
            <Pagination.Item
                key={number}
                active={number === selectedJournalPagination.currentPage}
                onClick={async () => await handlePaginationClick(number, "SelectedJournal")}
            >
                {number}
            </Pagination.Item>,
        );
    }
    const handleSaveArticle = async (article) => {
        if(context.userLogIn.isAuthenticated && context.userLogIn.isAdmin){
            alert("Saving Document Using Admin Account is not Allowed. Switch to simple user account.");
        }
        else if (context.userLogIn.isAuthenticated && !context.userLogIn.isAdmin) {
            const body = {
                DOI: [article.ID],
                userID: context.userLogIn.user_id
            };
            const response = await saveArticle(body);
            if (response === httpStatusInternalServerError) {
                alert("Sorry, Could Not Save Document");
            } else {
                alert("Document Saved Successfully");
                await setSavedArticleIds((prev) => new Set(prev).add(article.ID));
                await context.addSavedArticle(article.ID)
            }
        } else {
            alert("First Create Account OR Log-In to save the document.");
        }
    };
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
    useEffect(()=>{
       const storeData = async ()=>{
            const totalPages = Math.ceil(allData.length / 10)
            await setPagination(prevState => ({...prevState, totalPages: totalPages}))
           return allData.map((article) => {
               return (<tr key={article.ID}>
                   <td>
                       <div className={"result"}>
                           <div className={"result-detail"}>
                               <a
                                   className={"heading"}
                                   target={"_blank"}
                               >
                                   <h3
                                       onClick={() => {
                                           navigator(`/singlePaper/${encodeURIComponent(article.ID)}`)
                                       }}
                                   >{article.PaperTitle}</h3>
                               </a>
                               <p>{article.Abstract.slice(0, 255)}</p>
                               <button
                                   className={article.PDF === null || article.PDF === "" || article.paper_PDF === undefined ? "disabled_pdf" : "downloadButton tags"}
                                   onClick={async () => {
                                       await handleDownloadPDF(article.PDF);
                                   }}
                               >
                                   Download PDF
                               </button>
                               <Button
                                   className={
                                       savedArticleIds.has(article.ID)
                                           ? 'tags savedArticle'
                                           : 'tags tags-button'
                                   }
                                   onClick={() => handleSaveArticle(article)}
                               >
                                   {savedArticleIds.has(article.ID) ? 'Article Saved' : 'Save Article'}
                               </Button>
                               <Button
                                   className={"tags tags-button"}
                                   onClick={() => {
                                       window.open(`/graph/${encodeURIComponent(article.ID)}`, "_blank");
                                   }}
                               >
                                   View Graph
                               </Button>
                           </div>
                           <div className={"result-metadata"}>
                               <h5 className={"heading"}>Authors: </h5>
                               {article.authorsFound ? (
                                   <div>
                                       {article.AuthorList.map((author) => (
                                           <span
                                               key={author[0]}
                                               style={{cursor: "pointer"}}
                                               className={"authors"}
                                               onClick={() => {
                                                   navigator(`/profile/${author[0]}`)
                                               }}
                                           >{author[1]}</span>
                                       ))}
                                   </div>
                               ) : <span style={{marginLeft: '10px'}}>{article.AuthorList.join(", ")}</span>}
                               <div>
                                   <h5 className={"heading heading-extra"}>Published at: </h5>
                                   {article.JournalName} - {article.Published_Date}
                               </div>
                               <div>
                                   <h5 className={"heading heading-extra"}>Citations: </h5>
                                   {article.Citations !==0 ?<span
                                       className={"publication-site"}
                                       onClick={() => {
                                           navigator(`/results/${encodeURIComponent(article.ID)}`)
                                       }}
                                       style={{cursor: "pointer", color: "skyblue"}}
                                   >{article.Citations}</span>:0}
                               </div>
                               {article.TopicList.length > 0 ? (
                                   <div>
                                       <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                       {article.TopicList.map((topic, i) => (
                                           <a
                                               href={`/search/results/${topic}`}
                                               target={"_blank"}
                                               className={"tags"} key={i}>
                                        <span
                                            onClick={async () => {
                                                // navigator(`/search/results/${topic}`)
                                                // await changeStat(topic)
                                            }}
                                        >{topic}</span>
                                           </a>
                                       ))}
                                   </div>
                               ) : null}
                           </div>
                       </div>
                   </td>
               </tr>);
           });
        }
        storeData().then(async (data)=>{
            setData(data)
        })
    },[allData, savedArticleIds])
    useEffect(()=>{
       const storeData = async ()=>{
           return sortedDate.map((article) => {
               return (<tr key={article.ID}>
                   <td>
                       <div className={"result"}>
                           <div className={"result-detail"}>
                               <a
                                   className={"heading"}
                                   target={"_blank"}
                               >
                                   <h3
                                       onClick={() => {
                                           navigator(`/singlePaper/${encodeURIComponent(article.ID)}`)
                                       }}
                                   >{article.PaperTitle}</h3>
                               </a>
                               <p>{article.Abstract.slice(0, 255)}</p>
                               <button
                                   className={article.PDF === null || article.PDF === "" || article.paper_PDF === undefined ? "disabled_pdf" : "downloadButton tags"}
                                   onClick={async () => {
                                       await handleDownloadPDF(article.PDF);
                                   }}
                               >
                                   Download PDF
                               </button>
                               <Button
                                   className={
                                       savedArticleIds.has(article.ID)
                                           ? 'tags savedArticle'
                                           : 'tags tags-button'
                                   }
                                   onClick={() => handleSaveArticle(article)}
                               >
                                   {savedArticleIds.has(article.ID) ? 'Article Saved' : 'Save Article'}
                               </Button>
                               <Button
                                   className={"tags tags-button"}
                                   onClick={() => {
                                       window.open(`/graph/${encodeURIComponent(article.ID)}`, "_blank");
                                   }}
                               >
                                   View Graph
                               </Button>
                           </div>
                           <div className={"result-metadata"}>
                               <h5 className={"heading"}>Authors: </h5>
                               {article.authorsFound ? (
                                   <div>
                                       {article.AuthorList.map((author) => (
                                           <span
                                               key={author[0]}
                                               style={{cursor: "pointer"}}
                                               className={"authors"}
                                               onClick={() => {
                                                   navigator(`/profile/${author[0]}`)
                                               }}
                                           >{author[1]}</span>
                                       ))}
                                   </div>
                               ) : <span style={{marginLeft: '10px'}}>{article.AuthorList.join(", ")}</span>}
                               <div>
                                   <h5 className={"heading heading-extra"}>Published at: </h5>
                                   {article.JournalName} - {article.Published_Date}
                               </div>
                               <div>
                                   <h5 className={"heading heading-extra"}>Citations: </h5>
                                   <span
                                       className={"publication-site"}
                                       onClick={() => {
                                           navigator(`/results/${encodeURIComponent(article.ID)}`)
                                       }}
                                       style={{cursor: "pointer", color: "skyblue"}}
                                   >{article.Citations}</span>
                               </div>
                               {article.TopicList.length > 0 ? (
                                   <div>
                                       <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                       {article.TopicList.map((topic, i) => (
                                           <a
                                               className={"tags"} key={i}>
                                        <span
                                            onClick={async () => {
                                                // navigator(`/search/results/${topic}`)
                                                await changeStat(topic)

                                            }}
                                        >{topic}</span>
                                           </a>
                                       ))}
                                   </div>
                               ) : null}
                           </div>
                       </div>
                   </td>
               </tr>);
           });
        }
        storeData().then(async (data)=>{
            setDateData(data)
        })
    },[sortedDate, savedArticleIds])
    useEffect(()=>{
       const storeData = async ()=>{
           return sortCitations.map((article) => {
               return (<tr key={article.ID}>
                   <td>
                       <div className={"result"}>
                           <div className={"result-detail"}>
                               <a
                                   className={"heading"}
                                   target={"_blank"}
                               >
                                   <h3
                                       onClick={() => {
                                           navigator(`/singlePaper/${encodeURIComponent(article.ID)}`)
                                       }}
                                   >{article.PaperTitle}</h3>
                               </a>
                               <p>{article.Abstract.slice(0, 255)}</p>
                               <button
                                   className={article.PDF === null || article.PDF === "" || article.paper_PDF === undefined ? "disabled_pdf" : "downloadButton tags"}
                                   onClick={async () => {
                                       await handleDownloadPDF(article.PDF);
                                   }}
                               >
                                   Download PDF
                               </button>
                               <Button
                                   className={
                                       savedArticleIds.has(article.ID)
                                           ? 'tags savedArticle'
                                           : 'tags tags-button'
                                   }
                                   onClick={() => handleSaveArticle(article)}
                               >
                                   {savedArticleIds.has(article.ID) ? 'Article Saved' : 'Save Article'}
                               </Button>
                               <Button
                                   className={"tags tags-button"}
                                   onClick={() => {
                                       window.open(`/graph/${encodeURIComponent(article.ID)}`, "_blank");
                                   }}
                               >
                                   View Graph
                               </Button>
                           </div>
                           <div className={"result-metadata"}>
                               <h5 className={"heading"}>Authors: </h5>
                               {article.authorsFound ? (
                                   <div>
                                       {article.AuthorList.map((author) => (
                                           <span
                                               key={author[0]}
                                               style={{cursor: "pointer"}}
                                               className={"authors"}
                                               onClick={() => {
                                                   navigator(`/profile/${author[0]}`)
                                               }}
                                           >{author[1]}</span>
                                       ))}
                                   </div>
                               ) : <span style={{marginLeft: '10px'}}>{article.AuthorList.join(", ")}</span>}
                               <div>
                                   <h5 className={"heading heading-extra"}>Published at: </h5>
                                   {article.JournalName} - {article.Published_Date}
                               </div>
                               <div>
                                   <h5 className={"heading heading-extra"}>Citations: </h5>
                                   <span
                                       className={"publication-site"}
                                       onClick={() => {
                                           navigator(`/results/${encodeURIComponent(article.ID)}`)
                                       }}
                                       style={{cursor: "pointer", color: "skyblue"}}
                                   >{article.Citations}</span>
                               </div>
                               {article.TopicList.length > 0 ? (
                                   <div>
                                       <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                       {article.TopicList.map((topic, i) => (
                                           <a
                                               className={"tags"} key={i}>
                                        <span
                                            onClick={async () => {
                                                // navigator(`/search/results/${topic}`)
                                                await changeStat(topic)

                                            }}
                                        >{topic}</span>
                                           </a>
                                       ))}
                                   </div>
                               ) : null}
                           </div>
                       </div>
                   </td>
               </tr>);
           });
        }
        storeData().then(async (data)=>{
            setCitedData(data)
        })
    },[sortCitations, savedArticleIds])
    useEffect(()=>{
       const storeData = async ()=>{
           return sortByCitationsAndDate.map((article) => {
               return (<tr key={article.ID}>
                   <td>
                       <div className={"result"}>
                           <div className={"result-detail"}>
                               <a
                                   className={"heading"}
                                   target={"_blank"}
                               >
                                   <h3
                                       onClick={() => {
                                           navigator(`/singlePaper/${encodeURIComponent(article.ID)}`)
                                       }}
                                   >{article.PaperTitle}</h3>
                               </a>
                               <p>{article.Abstract.slice(0, 255)}</p>
                               <button
                                   className={article.PDF === null || article.PDF === "" || article.paper_PDF === undefined ? "disabled_pdf" : "downloadButton tags"}
                                   onClick={async () => {
                                       await handleDownloadPDF(article.PDF);
                                   }}
                               >
                                   Download PDF
                               </button>
                               <Button
                                   className={
                                       savedArticleIds.has(article.ID)
                                           ? 'tags savedArticle'
                                           : 'tags tags-button'
                                   }
                                   onClick={() => handleSaveArticle(article)}
                               >
                                   {savedArticleIds.has(article.ID) ? 'Article Saved' : 'Save Article'}
                               </Button>
                               <Button
                                   className={article.saved?"tags savedArticle":"tags tags-button"}
                                   onClick={async (e) => {
                                       if(context.userLogIn.isAuthenticated){
                                           const body = {
                                               DOI:[article.ID],
                                               userID:context.userLogIn.user_id
                                           }
                                           const response = await saveArticle(body)
                                           if(response===httpStatusInternalServerError){alert("Sorry, Could Not Save Document")}
                                           else{alert("Document Saved Successfully")}
                                       }else{
                                           alert("First Create Account OR Log-In to save the document.")
                                       }
                                   }}
                               >
                                   Save Article
                               </Button>
                               <Button
                                   className={"tags tags-button"}
                                   onClick={() => {
                                       window.open(`/graph/${encodeURIComponent(article.ID)}`, "_blank");
                                   }}
                               >
                                   View Graph
                               </Button>
                           </div>
                           <div className={"result-metadata"}>
                               <h5 className={"heading"}>Authors: </h5>
                               {article.authorsFound ? (
                                   <div>
                                       {article.AuthorList.map((author) => (
                                           <span
                                               key={author[0]}
                                               style={{cursor: "pointer"}}
                                               className={"authors"}
                                               onClick={() => {
                                                   navigator(`/profile/${author[0]}`)
                                               }}
                                           >{author[1]}</span>
                                       ))}
                                   </div>
                               ) : <span style={{marginLeft: '10px'}}>{article.AuthorList.join(", ")}</span>}
                               <div>
                                   <h5 className={"heading heading-extra"}>Published at: </h5>
                                   {article.JournalName} - {article.Published_Date}
                               </div>
                               <div>
                                   <h5 className={"heading heading-extra"}>Citations: </h5>
                                   <span
                                       className={"publication-site"}
                                       onClick={() => {
                                           navigator(`/results/${encodeURIComponent(article.ID)}`)
                                       }}
                                       style={{cursor: "pointer", color: "skyblue"}}
                                   >{article.Citations}</span>
                               </div>
                               {article.TopicList.length > 0 ? (
                                   <div>
                                       <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                       {article.TopicList.map((topic, i) => (
                                           <a
                                               className={"tags"} key={i}>
                                        <span
                                            onClick={async () => {
                                                // navigator(`/search/results/${topic}`)
                                                await changeStat(topic)

                                            }}
                                        >{topic}</span>
                                           </a>
                                       ))}
                                   </div>
                               ) : null}
                           </div>
                       </div>
                   </td>
               </tr>);
           });
        }
        storeData().then(async (data)=>{
            setBothCitations(data)
        })
    },[sortByCitationsAndDate, savedArticleIds])
    useEffect(()=>{
       const storeData = async ()=>{
           const totalPages = Math.ceil(rangedDocuments.length / 10)
           await setRangedPagination(prevState => ({...prevState, totalPages: totalPages}))
           return rangedDocuments.map((article) => {
               return (<tr key={article.ID}>
                   <td>
                       <div className={"result"}>
                           <div className={"result-detail"}>
                               <a
                                   className={"heading"}
                                   target={"_blank"}
                               >
                                   <h3
                                       onClick={() => {
                                           navigator(`/singlePaper/${encodeURIComponent(article.ID)}`)
                                       }}
                                   >{article.PaperTitle}</h3>
                               </a>
                               <p>{article.Abstract.slice(0, 255)}</p>
                               <button
                                   className={article.PDF === null || article.PDF === "" || article.paper_PDF === undefined ? "disabled_pdf" : "downloadButton tags"}
                                   onClick={async () => {
                                       await handleDownloadPDF(article.PDF);
                                   }}
                               >
                                   Download PDF
                               </button>
                               <Button
                                   className={
                                       savedArticleIds.has(article.ID)
                                           ? 'tags savedArticle'
                                           : 'tags tags-button'
                                   }
                                   onClick={() => handleSaveArticle(article)}
                               >
                                   {savedArticleIds.has(article.ID) ? 'Article Saved' : 'Save Article'}
                               </Button>
                               <Button
                                   className={"tags tags-button"}
                                   onClick={() => {
                                       window.open(`/graph/${encodeURIComponent(article.ID)}`, "_blank");
                                   }}
                               >
                                   View Graph
                               </Button>
                           </div>
                           <div className={"result-metadata"}>
                               <h5 className={"heading"}>Authors: </h5>
                               {article.authorsFound ? (
                                   <div>
                                       {article.AuthorList.map((author) => (
                                           <span
                                               key={author[0]}
                                               style={{cursor: "pointer"}}
                                               className={"authors"}
                                               onClick={() => {
                                                   navigator(`/profile/${author[0]}`)
                                               }}
                                           >{author[1]}</span>
                                       ))}
                                   </div>
                               ) : <span style={{marginLeft: '10px'}}>{article.AuthorList.join(", ")}</span>}
                               <div>
                                   <h5 className={"heading heading-extra"}>Published at: </h5>
                                   {article.JournalName} - {article.Published_Date}
                               </div>
                               <div>
                                   <h5 className={"heading heading-extra"}>Citations: </h5>
                                   <span
                                       className={"publication-site"}
                                       onClick={() => {
                                           navigator(`/results/${encodeURIComponent(article.ID)}`)
                                       }}
                                       style={{cursor: "pointer", color: "skyblue"}}
                                   >{article.Citations}</span>
                               </div>
                               {article.TopicList.length > 0 ? (
                                   <div>
                                       <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                       {article.TopicList.map((topic, i) => (
                                           <a
                                               className={"tags"} key={i}>
                                        <span
                                            onClick={async () => {
                                                // navigator(`/search/results/${topic}`)
                                                await changeStat(topic)

                                            }}
                                        >{topic}</span>
                                           </a>
                                       ))}
                                   </div>
                               ) : null}
                           </div>
                       </div>
                   </td>
               </tr>);
           });
        }
        storeData().then(async (data)=>{
            setRangeDocuments(data)
        })
    },[rangedDocuments, savedArticleIds])
    useEffect(()=>{
       const storeData = async ()=>{
           const totalPages = Math.ceil(selectedJournalArticles.length / 10)
           await setSelectedJournalPagination(prevState => ({...prevState, totalPages: totalPages}))
           return selectedJournalArticles.map((article) => {
               return (<tr key={article.ID}>
                   <td>
                       <div className={"result"}>
                           <div className={"result-detail"}>
                               <a
                                   className={"heading"}
                                   target={"_blank"}
                               >
                                   <h3
                                       onClick={() => {
                                           navigator(`/singlePaper/${encodeURIComponent(article.ID)}`)
                                       }}
                                   >{article.PaperTitle}</h3>
                               </a>
                               <p>{article.Abstract.slice(0, 255)}</p>
                               <button
                                   className={article.PDF === null || article.PDF === "" || article.paper_PDF === undefined ? "disabled_pdf" : "downloadButton tags"}
                                   onClick={async () => {
                                       await handleDownloadPDF(article.PDF);
                                   }}
                               >
                                   Download PDF
                               </button>
                               <Button
                                   className={
                                       savedArticleIds.has(article.ID)
                                           ? 'tags savedArticle'
                                           : 'tags tags-button'
                                   }
                                   onClick={() => handleSaveArticle(article)}
                               >
                                   {savedArticleIds.has(article.ID) ? 'Article Saved' : 'Save Article'}
                               </Button>
                               <Button
                                   className={"tags tags-button"}
                                   onClick={() => {
                                       window.open(`/graph/${encodeURIComponent(article.ID)}`, "_blank");
                                   }}
                               >
                                   View Graph
                               </Button>
                           </div>
                           <div className={"result-metadata"}>
                               <h5 className={"heading"}>Authors: </h5>
                               {article.authorsFound ? (
                                   <div>
                                       {article.AuthorList.map((author) => (
                                           <span
                                               key={author[0]}
                                               style={{cursor: "pointer"}}
                                               className={"authors"}
                                               onClick={() => {
                                                   navigator(`/profile/${author[0]}`)
                                               }}
                                           >{author[1]}</span>
                                       ))}
                                   </div>
                               ) : <span style={{marginLeft: '10px'}}>{article.AuthorList.join(", ")}</span>}
                               <div>
                                   <h5 className={"heading heading-extra"}>Published at: </h5>
                                   {article.JournalName} - {article.Published_Date}
                               </div>
                               <div>
                                   <h5 className={"heading heading-extra"}>Citations: </h5>
                                   <span
                                       className={"publication-site"}
                                       onClick={() => {
                                           navigator(`/results/${encodeURIComponent(article.ID)}`)
                                       }}
                                       style={{cursor: "pointer", color: "skyblue"}}
                                   >{article.Citations}</span>
                               </div>
                               {article.TopicList.length > 0 ? (
                                   <div>
                                       <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                       {article.TopicList.map((topic, i) => (
                                           <a
                                               className={"tags"} key={i}>
                                        <span
                                            onClick={async () => {
                                                // navigator(`/search/results/${topic}`)
                                                await changeStat(topic)

                                            }}
                                        >{topic}</span>
                                           </a>
                                       ))}
                                   </div>
                               ) : null}
                           </div>
                       </div>
                   </td>
               </tr>);
           });
        }
        storeData().then(async (data)=>{
            setSelectedJournalArticle(data)
        })
    },[selectedJournalArticles, savedArticleIds])
    return(<>
        {notFoundError?<Alert variant={"danger"}>No Data Found</Alert>:null}
        {serverError?<Alert variant={"danger"}>Can't fetch Data Server Error</Alert>:null}
        {!notFoundError&& !serverError?<><Table className={"result-page"}>
            {!enableCitaionSort && !enableDateSort && !inRangeArticlesFlag && !selectedJournalFlag ? <>{Data.slice((pagination.currentPage - 1) * 10, (pagination.currentPage) * 10)}</> : null}
            {enableDateSort && !enableCitaionSort && !inRangeArticlesFlag && !selectedJournalFlag ? <>{dateData.slice((pagination.currentPage - 1) * 10, (pagination.currentPage) * 10)}</> : null}
            {!enableDateSort && enableCitaionSort && !inRangeArticlesFlag && !selectedJournalFlag ? <>{citedData.slice((pagination.currentPage - 1) * 10, (pagination.currentPage) * 10)}</> : null}
            {enableDateSort && enableCitaionSort && !inRangeArticlesFlag && !selectedJournalFlag ? <>{bothCitations.slice((pagination.currentPage - 1) * 10, (pagination.currentPage) * 10)}</> : null}
            {inRangeArticlesFlag && !selectedJournalFlag ? <>{rangeDocuments.slice((rangedPagination.currentPage - 1) * 10, (rangedPagination.currentPage) * 10)}</> : null}
            {!inRangeArticlesFlag && selectedJournalFlag ? <>{selectedJournalArticle.slice((selectedJournalPagination.currentPage - 1) * 10, (selectedJournalPagination.currentPage) * 10)}</> : null}
        </Table>
            <div className={"Pagination"}>
                {!inRangeArticlesFlag ? null : <Pagination size="sm">{rangedList}</Pagination>}
                {selectedJournalFlag ? <Pagination size="sm">{selectedJournalList}</Pagination> : null}
                {!inRangeArticlesFlag && !selectedJournalFlag ? <Pagination size="sm">{items}</Pagination> : null}
            </div>
        </>:null}
    </>)


}