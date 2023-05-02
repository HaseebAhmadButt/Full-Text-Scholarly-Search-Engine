import React, {useContext, useEffect, useState} from "react";
import ResultProfileHeader from "./ResultProfileHeader";
import ResultsShowing from "../Result Page/ResultsShowing";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {getAcceptedPublishedArticles, getPublisher, getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter} from "../../Services/AuthorProfileServices/PublisherDataService";
import {Alert} from "react-bootstrap";
export default function ProfileResults(props) {
    const {settings} = props;
    const [errors, setErrors] = useState({
        serverError:false,
        notFoundError:false
    })
    const context = useContext(User_Sign_In_Context)
    const [profileObject, setProfileObject] = useState({
        affiliationLink: "",
        affiliationName:"",
        publisherEmail: "",
        publisherHIndex: 0,
        publisherHMedian: 0,
        publisherID:0,
        publisherName: "",
        publisherSite: "",
        publisherStatus: "",
        interests:[],
        names:[]
    })
    const [publisherData, setPublisherData] = useState({})
    const [journals, setJournals] = useState([])
    useEffect(()=>{
        async function fetchPublisher() {
            if (context.userLogIn.isPublisher) {
                const response = await getPublisher({"userID": context.userLogIn.user_id})
                if (response === "Not Found") {
                    await setErrors({serverError: false, notFoundError: true})
                } else if (response === "Error") {
                    await setErrors({notFoundError: false, serverError: true})
                } else {
                    const dataObject = {
                        affiliationLink: response.Publisher.affiliationLink,
                        affiliationName:response.Publisher.affiliationName,
                        publisherEmail: response.Publisher.publisherEmail,
                        publisherHIndex: response.Publisher.publisherHIndex,
                        publisherHMedian: response.Publisher.publisherHMedian,
                        publisherID:response.Publisher.publisherID,
                        publisherName: response.Publisher.publisherName,
                        publisherSite: response.Publisher.publisherSite,
                        publisherStatus: response.Publisher.publisherStatus,
                        interests: response.AreaofInterests,
                        names: response.AuthorNames,
                    }
                    await context.upDataPublisher(dataObject)
                    await setProfileObject(dataObject)
                    const publisherArticles = await getAcceptedPublishedArticles(0,10,dataObject.publisherID)
                    if(publisherArticles === 500){
                        setErrors({serverError: true, notFoundError: false})
                    }
                    else{
                        setErrors({serverError: false, notFoundError: false})
                        await setPublisherData(publisherArticles)
                    }
                }
            }
        }

            fetchPublisher().then(()=>{});
    }, [])
    const fetchPaginationArticles = async (pageNo, pageSize)=>{
        const articleData = await getAcceptedPublishedArticles(pageNo, pageSize, profileObject.publisherID)
        await setPublisherData(articleData)
    }
    const fetchQueryArticles = async (pageNo, pageSize, query) =>{
        const fetchResults = await getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter(pageNo, pageSize, profileObject.publisherID,query)
        await setPublisherData(fetchResults)

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
    return (
            <>
                <div className={"main-user-profile"}>
                    {errors.notFoundError?<Alert variant={"danger"}>No data Found</Alert>:""}
                    {errors.serverError?<Alert variant={"danger"}>Error in Fetching Data from Server</Alert>:""}
                    <ResultProfileHeader
                        functionCalled = {settings}
                        affiliationLink= {profileObject.affiliationLink}
                        affiliationName= {profileObject.affiliationName}
                        publisherEmail=  {profileObject.publisherEmail}
                        publisherHIndex= {profileObject.publisherHIndex}
                        publisherHMedian= {profileObject.publisherHMedian}
                        publisherID= {profileObject.publisherID}
                        publisherName= {profileObject.publisherName}
                        publisherSite= {profileObject.publisherSite}
                        publisherStatus= {profileObject.publisherStatus}
                        interests= {profileObject.interests}
                        names= {profileObject.names}
                    />
                    {/*<ResultsShowingSearch*/}
                    {/*    journals={journals}*/}
                    {/*/>*/}
                    <ResultsShowing
                        publisherData = {publisherData}
                        updatingJournals = {addJournal}
                        loadNewPage = {fetchPaginationArticles}
                        fetchSearchArticles = {fetchQueryArticles}
                    />
                {/*<hr/>*/}
                {/*<ResultsShowingSearchRecommendation />*/}
                </div>
            </>
    );

}

