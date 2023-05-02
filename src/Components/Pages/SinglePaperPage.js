import {PaperDetails} from "../Singlepaper/PaperDetails";
import RecommendedPapers from "../Home-Page/RecommendedPapers";
import React, {useEffect, useState} from "react";
import UserResultPage from "../Result Page/UserResultPage";
import {getCitations, getCitingArticles} from "../../Services/AuthorProfileServices/PublisherDataService";
import {useNavigate, useParams} from "react-router-dom";
import {getArticle} from "../../Services/UserService/UserDataRetieval";

export const SinglePaperPage = () =>{
    const {paperDOI} = useParams()
    const navigator = useNavigate()
    if(paperDOI === ""){
        navigator("/")
    }
    const [paper, setPaper] = useState({
        authors: [],
        createdDate: "",
        paper_Abstract: "",
        paper_DOI: "",
        paper_Journal: {},
        paper_PDF: "",
        paper_STATUS:"",
        paper_Title: "",
        paper_UPDATE_TYPE: "",
        paper_URL: "",
        published_Date: ""
    })
    const [foundDOIs, setDOIs] = useState([])
    const decodedID = decodeURIComponent(paperDOI)
    useEffect(()=>{
        const Article = async () =>{
            return await getArticle(decodedID)
        }
        Article().then(async r => {
            await setPaper({
                authors: r.authors,
                createdDate: r.createdDate,
                paper_Abstract: r.paper_Abstract,
                paper_DOI: r.paper_DOI,
                paper_Journal: r.paper_Journal,
                paper_PDF: r.paper_PDF,
                paper_STATUS: r.paper_STATUS,
                paper_Title: r.paper_Title,
                paper_UPDATE_TYPE: r.paper_UPDATE_TYPE,
                paper_URL: r.paper_URL,
                published_Date: r.published_Date
            })

        })
    },[])



    const [publisherData, setPublisherData] = useState({})
    const [journals, setJournals] = useState([])

    const fetchPaginationArticles = async (pageNo, pageSize)=>{
        // const articleData = await getAcceptedPublishedArticles(pageNo, pageSize, profileObject.publisherID)
        // await setPublisherData(articleData)
    }
    const addJournal = (journalName) => {
        setJournals(journals => {
            if (journals.includes(journalName)) {
                return journals;
            } else {
                return [...journals, journalName];
            }
        });
    };
    const fetchQueryArticles = async (pageNo, pageSize) =>{
        const Data = {
            "pageNo":pageNo,
            "pageSize":pageSize,
            "DOIs": foundDOIs
        }
        const fetchResults = await getCitingArticles(Data)
        await setPublisherData(fetchResults)

    }
    useEffect(()=>{

        const fetDOIs = async ()=>{
            return await getCitations(decodedID)
        }
        fetDOIs().then(async (r) => {
            const dois = r[0]
            const IDs = dois.map((doi)=>{
                return doi.paperId;
            })
            await setDOIs(IDs)
        })
    },[])

    useEffect(()=>{
        if(foundDOIs.length !== 0){
            getArticles().then(async (r) =>{
                await setPublisherData(r)
            })
        }
    },[foundDOIs])
    const getArticles = async ()=>{
        const Data = {
            "pageNo":0,
            "pageSize":1,
            "DOIs": foundDOIs
        }
        return await getCitingArticles(Data)
    }
    return(
        <>
            <PaperDetails paper = {paper}/>
            <h1 style={{marginLeft:'30px', paddingLeft:'70px'}}>Citations</h1>
            <hr style={{width:'85%',margin:'auto'}}/>
            <UserResultPage
                publisherData = {publisherData}
                updatingJournals = {addJournal}
                loadNewPage = {fetchPaginationArticles}
                fetchSearchArticles = {fetchQueryArticles}
            />
            <RecommendedPapers />
        </>
    )
}