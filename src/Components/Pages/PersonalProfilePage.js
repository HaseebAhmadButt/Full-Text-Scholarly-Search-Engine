import ProfileHeader from "../Common/Headers/ProfileHeaders";
import PersonalProfile from "../Profiles/User Profile/PersonalProfile";
import Footer from "../Common/Footer";
import React, {useContext, useEffect, useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import SearchHeader from "../Common/Headers/SearchHeader";
import {
    getAcceptedPublishedArticles, getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter,
    getPublisherWithPublisherID
} from "../../Services/AuthorProfileServices/PublisherDataService"
import ProfileResults from "../Profiles/ProfileResults";
import RecommendedAuthors from "../Profiles/AuthorRecommendations";
import {Alert} from "react-bootstrap";
import ResultProfileHeader from "../Profiles/ResultProfileHeader";
import ResultsShowing from "../Result Page/ResultsShowing";
import ResultsShowingSearch from "../Profiles/ResultProfileSearch";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";
export const PersonalProfilePage = ()=>{
    const navigator = useNavigate();
    const context = useContext(User_Sign_In_Context)
    useEffect(() => {
        if (!context.userLogIn.isAuthenticated) {
            navigator("/");
        }
    }, [navigator, context.userLogIn]);



    return(<><ProfileHeader /><PersonalProfile /><Footer /></>)
}
export const AuthorProfile = () =>{
    const navigator = useNavigate()
    const {authorID} = useParams()

    // // || !/^0*\d{1,20}$/.test(authorID)
    // if(authorID.length <= 20 ) {
    //     navigator("/")
    // }

    const [profileObject, setProfileObject] = useState({
        affiliationLink: "",
        affiliationName:"",
        publisherEmail: "",
        publisherHIndex: 0,
        publisherID:0,
        publisherHMedian: 0,
        publisherName: "",
        publisherSite: "",
        publisherStatus: "",
        interests:[],
        names:[]
    })
    const [errors, setErrors] = useState({
        serverError:false,
        notFoundError:false
    })
    const [publisherData, setPublisherData] = useState({})
    const [journals, setJournals] = useState([])



    let index = 0
    for(let i=0; i<authorID.length; i++){
        if(authorID[i]!=='0'){
            index = i
            break
        }
    }
    useEffect(()=>{
        const getAuthorData = async () =>{
            return await getPublisherWithPublisherID(Number(authorID.slice(index)))
        }
        getAuthorData().then(async (r)=>{
            if(r=== httpStatusNotFound) console.log("error")
            else if(r=== httpStatusInternalServerError) console.log("Server Error")
            else{
                await setProfileObject({
                    affiliationLink: r.Publisher.affiliationLink,
                    affiliationName: r.Publisher.affiliationName,
                    publisherEmail: r.Publisher.publisherEmail,
                    publisherHIndex: r.Publisher.publisherHIndex,
                    publisherID: r.Publisher.publisherID,
                    publisherHMedian: r.Publisher.publisherHMedian,
                    publisherName: r.Publisher.publisherName,
                    publisherSite: r.Publisher.publisherSite,
                    publisherStatus: r.Publisher.publisherStatus,
                    interests: r.AreaofInterests,
                    names: r.AuthorNames

                })
                const publisherArticles = await getAcceptedPublishedArticles(0, 10, r.Publisher.publisherID)
                if (publisherArticles === 500) {
                    setErrors({serverError: true, notFoundError: false})
                } else {
                    setErrors({serverError: false, notFoundError: false})
                    await setPublisherData(publisherArticles)
                }
            }
        })

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


    return(<><SearchHeader />
            <div className={"main-user-profile"}>
                {errors.notFoundError?<Alert variant={"danger"}>No data Found</Alert>:""}
                {errors.serverError?<Alert variant={"danger"}>Error in Fetching Data from Server</Alert>:""}
                <ResultProfileHeader
                    functionCalled = "{settings}"
                    affiliationLink= {profileObject.affiliationLink}
                    affiliationName= {profileObject.affiliationName}
                    publisherEmail=  {profileObject.publisherEmail}
                    publisherHIndex= {profileObject.publisherHIndex}
                    publisherHMedian= {profileObject.publisherHMedian}
                    publisherName= {profileObject.publisherName}
                    publisherSite= {profileObject.publisherSite}
                    publisherStatus= {profileObject.publisherStatus}
                    interests= {profileObject.interests}
                    names={profileObject.names}
                />
                <ResultsShowing
                    publisherData = {publisherData}
                    updatingJournals = {addJournal}
                    loadNewPage = {fetchPaginationArticles}
                    fetchSearchArticles = {fetchQueryArticles}
                />
                {/*<hr/>*/}
                {/*<ResultsShowingSearchRecommendation />*/}
            </div>

        {/*<RecommendedAuthors />*/}
        <Footer /></>)
}

