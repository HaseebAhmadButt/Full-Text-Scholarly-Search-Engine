import React, {useContext, useEffect, useState} from "react";
import Spinner from 'react-bootstrap/Spinner';
import MiddleSearchArea from "../Result Page/Search-Area";
import {useNavigate, useParams} from "react-router-dom";
import {getResults} from "../../Services/UserService/UserSearchService";
import {SearchResults} from "../Result Page/SearchResults";
import {getAuthors, getCitations, getPDF} from "../../Services/AuthorProfileServices/PublisherDataService";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";

export const SearchResultPage = () =>{
    const {query} = useParams()
    const navigator = useNavigate()
    if(query.trim().length===0) navigator("/")
    const context = useContext(User_Sign_In_Context)
    const [q, setQ] = useState(query)
    const [sortByDate, setSortByDate] = useState([])
    const [sortByCitations, setSortByCitations] = useState([])
    const [sortByCitationsAndDate, setSortByCitationsAndDate] = useState([])
    const [allData, setAllData] = useState([])
    const [enableCitationsSort, setEnableCitationsSort]= useState(false)
    const [enableDateSort, setEnableDateSort]= useState(false)
    const [betweenArticles, setBetweenArticles]= useState(false)
    const [selectedJournalFlag, setSelectedJournalFlag]= useState(false)
    const [articlesInRange, setArticlesInRange] = useState([])
    const [journalName, setJournalName] = useState([])
    const [selectedJournal, setSelectedJournal] = useState([])
    const [errors, setErrors] = useState({
        noData:false,
        serverError:false
    })
    const [animation, setAnimation] = useState(true)

    const SelectedJournalFlag = async (value)=>{
        await setSelectedJournalFlag(value)
    }
    const selectedJournalArticles = async (JournalName) =>{
        const filteredDate = allData.filter((article)=>{
            return article.JournalName === JournalName
        })
       await setSelectedJournal(filteredDate)
    }
    const dateSorting = async (value)=>{
        await setEnableDateSort(value);
    }
    const citationSorting = async (value)=>{
        await setEnableCitationsSort(value);
    }
    const changeBetweenArticles = async (values)=>{
        await setBetweenArticles(values)
    }
    const fetchArticlesBetweenArticles = async (startDate, endDate)=>{
        const filteredDate = allData.filter((article)=>{
            return article.Published_Date >= Number(startDate) && article.Published_Date <= Number(endDate)
        })
        await setArticlesInRange(filteredDate)
        await setBetweenArticles(true)
    }

    useEffect(()=>{
        const fetchResults = async () =>{
            if(query.split(" ").length===1)
            {
                return await getResults("The "+query)
            }
            else{
                return await getResults(query)
            }
        }
        fetchResults().then(async (r)=>{
           if (r === httpStatusInternalServerError||r==="FETCH_ERROR"||r === httpStatusNotFound) {
                await setErrors({noData: false, serverError: true});
            }
            else{

                let savedID = []
                let array = []
                if (r.length > 0) {
                    // if(context.userLogIn.isAuthenticated)
                    if (context.userLogIn.isAuthenticated && !context.userLogIn.isAdmin) {
                        // const savedIDs = await getSavedArticleID(context.userLogIn.user_id)
                        // if (savedIDs === httpStatusInternalServerError) alert("Can't Load Saved Articles")
                        // else {
                        if (context.userLogIn.savedArticles && Array.isArray(context.userLogIn.savedArticles) && (!context.userLogIn.isAdmin)) {
                            savedID = [...context.userLogIn.savedArticles];
                        }
                            // savedID = [...savedIDs]
                        // }
                    }

                    const articlesContent = r.map(async (article) => {
                        const authors = await getAuthors(article.ID);
                        const citations = await getCitations(article.ID)
                        const PDF = await getPDF(article.ID)
                        return {
                            article,
                            authors,
                            citations,
                            PDF
                        };
                    });
                    Promise.all(articlesContent).then((results) => {
                        const articles = results.map(({article, authors, citations, PDF}) => {
                            if (!array.includes(article.JournalName)) {
                                array.push(article.JournalName)
                            }
                            return ({
                                ID: article.ID,
                                PaperTitle: article.Title,
                                Abstract: article.Abstract,
                                Published_Date: article.Published_Date,
                                TopicList: article.Topics_List,
                                JournalName: article.JournalName,
                                AuthorList: authors.length > 0 ? authors : article.Authors_List,
                                authorsFound: authors.length > 0,
                                Citations: citations[0].length,
                                PDF: PDF.PDF,
                                saved: savedID.includes(article.ID)
                            })
                        });
                        setAllData(articles);
                        setJournalName(array);
                    });
                }
                else{
                    await setErrors({noData: true, serverError: false});
                }
            }
            setAnimation(false)

        })
    }, [q])
    useEffect(()=>{
        if(allData.length>0){
            //sorting data based on Citations
            const sortData = async ()=>{
                const papersByDate = [...allData].sort((a, b) => a.Published_Date - b.Published_Date);
                const papersByCitations =[...allData].sort((a, b) => b.Citations - a.Citations);
                const papersByCitationsAndDate = [...allData].sort((a, b) => {
                    if (b.Citations !== a.Citations) {
                        return b.Citations - a.Citations; // Sort by citations first
                    }
                    return a.Published_Date - b.Published_Date; // If citations are equal, sort by published date
                });

                await Promise.all([papersByDate, papersByCitations])
                //Updating State for date sorted data
                await setSortByDate(papersByDate)
                await setSortByCitations(papersByCitations)
                await setSortByCitationsAndDate(papersByCitationsAndDate)
            }
            sortData().then()

        }
    },[allData])
    const changeQuery=async (query)=>{
        await setQ(query)
        await setAnimation(true)
        navigator(`/search/results/${query}`)
    }

    return(
        <>
            {animation?<div className={"animationDiv"}> <Spinner className={"animation"} animation="border" variant="primary"/></div>:
                <>
                    <MiddleSearchArea
                        query={q}
                        changeStat={changeQuery}
                        enableCitationSort={citationSorting}
                        enableDateSort={dateSorting}
                        betweenArticlesMethod={changeBetweenArticles}
                        fetchArticlesBetweenArticlesFlag={fetchArticlesBetweenArticles}
                        journalList={journalName}
                        selectedJournalFlag={SelectedJournalFlag}
                        selectedJournalArticles={selectedJournalArticles}
                        notFoundError={errors.noData}
                        serverError={errors.serverError}
                     />
                <hr/>
                <SearchResults
                    allData={allData}
                    sortedDate={sortByDate}
                    sortCitations={sortByCitations}
                    sortByCitationsAndDate={sortByCitationsAndDate}
                    changeStat={changeQuery}
                    enableCitaionSort={enableCitationsSort}
                    enableDateSort={enableDateSort}
                    rangedDocuments={articlesInRange}
                    inRangeArticlesFlag={betweenArticles}
                    selectedJournalFlag={selectedJournalFlag}
                    selectedJournalArticles={selectedJournal}
                    notFoundError={errors.noData}
                    serverError={errors.serverError}
                /></>}
        </>
    )
}