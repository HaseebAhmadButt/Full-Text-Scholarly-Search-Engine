import SearchHeader from "../Common/Headers/SearchHeader";
import Footer from "../Common/Footer";
import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {
    getCitations
} from "../../Services/AuthorProfileServices/PublisherDataService";
import {getCitingArticles} from "../../Services/AuthorProfileServices/PublisherDataService";
import UserResultPage from "../Result Page/UserResultPage";
export const CitationsResultPages = () =>{
    const params = useParams();
    const navigate = useNavigate()
    const decodedURI = decodeURIComponent(params.citations)
    if(decodedURI===""){
        navigate("/")
    }
    const [foundDOIs, setDOIs] = useState([])
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
            return await getCitations(decodedURI)
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
            "pageSize":10,
            "DOIs": foundDOIs
        }
        return await getCitingArticles(Data)
    }
    return(
        <>
            <SearchHeader />

            <div className={"middle-search-area"}>
                <Form >
                    <Form.Group controlId="UserSearch" className={"middle-search-form"}>
                        <Form.Control
                            type="text"
                            // value={formValues.search}
                            // onChange={async (e) => {
                            //     await setFormValues((prev) => ({...prev, search: e.target.value}))
                            //}}
                            placeholder="Search for a paper, author, or topic"
                            className={"middle-search-input"}/>
                        <Button type="submit" className={"middle-search-button"}
                                // onClick={OpenSearchresuls}
                        ><FontAwesomeIcon icon={faSearchengin}/></Button>
                    </Form.Group>
                </Form>
            </div>
            <hr />
            <UserResultPage
                publisherData = {publisherData}
                updatingJournals = {addJournal}
                loadNewPage = {fetchPaginationArticles}
                fetchSearchArticles = {fetchQueryArticles}
            />
            <Footer />

        </>
    )
}