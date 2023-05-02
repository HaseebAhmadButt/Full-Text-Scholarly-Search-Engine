import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getArticle} from "../../Services/UserService/UserDataRetieval"
import {getAuthors, getCitations, getTopics} from "../../Services/AuthorProfileServices/PublisherDataService";
import {downloadPDF} from "../../Services/AdminService/DataRetrievalMethods";
import {Button} from "react-bootstrap";


export const PaperDetails = ({paper})=>{
    const [paperToShow, setPaperToShow] = useState()
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
        if(paper.paper_DOI!==""){
            const getPaperData = async () => {
                const topics = await getTopics(paper.paper_DOI);
                const authors = await getAuthors(paper.paper_DOI);
                const citations = await getCitations(paper.paper_DOI);
                return(
                    <div className={"page-main-container"}>
                        <div  style={{width:'60%'}}>

                            <div className={"paper-paperDetails"}>
                                <span></span>
                                <div className={"paper-paperDetails-header"}>
                                    <h1>{paper.paper_Title}</h1>
                                </div>
                                <div className={"publishdate"}>
                                    <span>Published on: {paper.published_Date}</span>
                                </div>
                                <div className={"text-data"}>
                            <span>
                            {paper.paper_Abstract}
                            </span>
                                </div>
                                <div className="Authors">
                                    <h5>Journal: </h5>
                                    <span>{paper.paper_Journal.journalName}</span>
                                </div>
                                <button
                                    className={paper.paper_PDF===null || paper.paper_PDF === "" || paper.paper_PDF === undefined?"disabled_pdf":"downloadButton tags"}
                                    onClick={async ()=>{await handleDownloadPDF(paper.paper_PDF)}}>
                                    Download PDF
                                </button>
                                <Button
                                    className={"tags tags-button"}
                                    onClick={() => {
                                        window.open(
                                            `/graph/${encodeURIComponent(paper.paper_DOI)}`,
                                            "_blank"
                                        );
                                    }}
                                >
                                    View Graph
                                </Button>
                            </div>
                        </div>
                        {/*{topics.length>0? :null}*/}
                        <div style={{width:'40%'}}>
                            <div className={"box-details"}>
                                {topics.length>0?
                                    <>
                                        <h1>Category</h1>
                                            <span>
                                                {topics.map((topic)=>{
                                                   return (<li>{topic}</li>)
                                                })}
                                            </span>
                                    </>:null}
                                <h1 style={{marginTop:'5px'}}>Authors</h1>
                                {authors.length > 0 ? (<div>
                                    {authors.map((author) => (
                                        <a
                                            href={`/profile/${author[0]}`}
                                            className={"authors"}
                                            key={author[0]}
                                        >
                                            <span>{author[1]}</span>
                                        </a>
                                    ))}
                                </div>) : paper.authors.join(", ")}

                                <h1 style={{marginTop:'5px'}}>Citations</h1>
                                {citations[0].length !==0 ?<div>
                                    <h5 className={"heading heading-extra"}>Citations: </h5>
                                    <a href={`/results/${encodeURIComponent(paper.paper_DOI)}`} className={"publication-site"} target={"_blank"}>{citations[0].length}</a>
                                </div>:
                                    <><a className={"publication-site"} >{citations[0].length} </a><span> Citations</span></>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            getPaperData().then(r=>setPaperToShow(r))
        }
    },[paper])

    
    return(<>
        {paperToShow}
    </> );

}