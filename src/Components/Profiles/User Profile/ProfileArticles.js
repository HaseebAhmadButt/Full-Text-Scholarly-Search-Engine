import React, {useContext, useEffect, useState} from "react";
import {
    Alert,
    Button,
    CloseButton,
    Form,
    FormCheck,
    FormGroup,
    InputGroup,
    Nav,
    Pagination,
    Table
} from "react-bootstrap";
import {
    deleteAuthorPapers,
    getAllArticles,
    getAllRequiredArticles,
    getAllUploadedArticlesBySpecificPublisher,
    getAuthors, getCitations,
    getTopics,
    saveUploadArticle,
    updateAddedArticles
} from "../../../Services/AuthorProfileServices/PublisherDataService";
import User_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
import {httpStatusInternalServerError} from "../../../Services/apiConstants";
import {downloadPDF} from "../../../Services/AdminService/DataRetrievalMethods";

export default function ProfileArticles() {

    const context = useContext(User_Sign_In_Context)
    const [findArticlePagination, setFindArticlePagination] = useState({
        activePage:1,
        totalPages: 1,
        totalElements:0,
        elementsPerPage:10
    })
    const [search, setSearchParameter] = useState({
        query:""
    })
    const [key, setKey] = useState({
        // personalArticles: true,
        addArticle: true,
        findArticle: false,
    });
    const [fileUploadForm, setFileUploadForm] = useState(false);
    const [articlesStat, setArticlesState] = useState([])

    // Below state variable is responsible for retrieving Data for Find Articles Tab
    const [data, setData] = useState([])
    // For Personal Articles State
    const [tableData, setTableData] = useState([])
    const [uploadedArticlePagination, setUploadedArticlePagination] = useState({
        activePage:1,
        totalPages: 1,
        totalElements:0,
        elementsPerPage:10
    })
    const [selectedArticles, setSelectedArticles] = useState([])
    const [uploadedArticles, setUploadedArticles] = useState([])
    const [alerts, setAlerts] = useState({
        success:false,
        error:false,
        formFields:false,
        incorrectFileSelected:false,
        fileUploadError:false,
        fileUploadSuccess:false
    })
    const [formState, setFormState] = useState({
        DOI:"",
        Title:"",
        Abstract:"",
        Year:1950,
        JournalName:"",
        authorName:"",
        fileToUpload:"",
        fileSelected:false
    })
    const [authorName, setAuthorNames] = useState([]);
    let items = [];
    let uploadItems = [];

    const getArticlesAll = async () =>{
        const result = await getAllArticles(context.userLogIn.user_id, (findArticlePagination.activePage-1), findArticlePagination.elementsPerPage);
        let pages;
        if(result.totalPages > 10){
            pages = 10
        }
        else{
            pages = result.totalPages
        }
        setFindArticlePagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: result.totalElements,
            activePage: (result.pageable.pageNumber)+1,
            elementsPerPage: result.size
        }))
        await setData(result.content);
    }
    const getAllUploadedArticlesByPublisher = async () =>{
        const result = await getAllUploadedArticlesBySpecificPublisher(context.publisher.publisherID, (uploadedArticlePagination.activePage-1), uploadedArticlePagination.elementsPerPage);
        let pages;
        if(result.totalPages > 10){
            pages = 10
        }
        else{
            pages = result.totalPages
        }
        setUploadedArticlePagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: result.totalElements,
            activePage: (result.pageable.pageNumber)+1,
            elementsPerPage: result.size
        }))
        setTableData(result.content);
    }
    const handleFindArticlePaginationClick = async (pageNumber) => {
        if(pageNumber === findArticlePagination.activePage) return;
        const result = await getAllArticles(context.userLogIn.user_id, (pageNumber-1), findArticlePagination.elementsPerPage);

        let pages;
        if(result.totalPages > 10){
            pages = 10
        }
        else{
            pages = result.totalPages
        }
        setFindArticlePagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: result.totalElements,
            activePage: (result.pageable.pageNumber)+1,
            elementsPerPage: result.size

        }))
        setData(result.content);
    };
    const handleUploadArticlePaginationClick = async (pageNumber) => {
        if(pageNumber === uploadedArticlePagination.activePage) return;
        const result = await getAllUploadedArticlesBySpecificPublisher(context.publisher.publisherID, (pageNumber-1), uploadedArticlePagination.elementsPerPage);
        let pages;
        if(result.totalPages > 10){
            pages = 10
        }
        else{
            pages = result.totalPages
        }
        setUploadedArticlePagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: result.totalElements,
            activePage: (result.pageable.pageNumber)+1,
            elementsPerPage: result.size
        }))
        setTableData(result.content);
    };
    for (let number = 1; number <= findArticlePagination.totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === findArticlePagination.activePage}
                onClick={async () => await handleFindArticlePaginationClick(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }
    for (let number = 1; number <= uploadedArticlePagination.totalPages; number++) {
        uploadItems.push(
            <Pagination.Item
                key={number}
                active={number === uploadedArticlePagination.activePage}
                onClick={async () => await handleUploadArticlePaginationClick(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getArticlesAll()

            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(()=>{});
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            if(context.publisher.publisherID === 0) return;
            try {
                await getAllUploadedArticlesByPublisher();
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().then();
    }, [context.publisher.publisherID]);
    useEffect(()=>{
        if (data.length>0) {
            const articlesContent = data.map(async (article) => {
                // updatingJournals(article[5]);
                const topics = await getTopics(article.paper_DOI);
                const authors = await getAuthors(article.paper_DOI);
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
                    console.log("Profile Articles Component: ", article)
                    return (
                        <tr key={article.paper_DOI}>
                            <td>
                                <Form.Check
                                    type={"checkbox"}
                                    onChange={async (e) => {
                                        await handleSelectedArticles(e, "find");
                                    }}
                                    className={"remove-select"}
                                    value={article.paper_DOI}
                                    checked={selectedArticles.includes(article.paper_DOI)}
                                    name={"selectedArticles"}
                                />
                            </td>
                            <td>
                                <div className={"result"}>
                                    <div className={"result-detail"}>
                                        <a href={`/singlePaper/${encodeURIComponent(article.paper_DOI)}`}
                                           className={"heading"}
                                           target={"_blank"}
                                        >
                                            <h3>{article.paper_Title}</h3>
                                        </a>
                                        <p>{article.paper_Abstract}</p>
                                        <button
                                            className={article.paper_PDF === null || article.paper_PDF  === ""|| article.paper_PDF  === undefined? "disabled_pdf" : "downloadButton tags"}
                                            onClick={async () => {
                                                await handleDownloadPDF(article.paper_PDF);
                                            }}
                                        >
                                            Download PDF
                                        </button>
                                        <Button
                                            className={"tags tags-button"}
                                            onClick={() => {
                                                window.open(`/graph/${encodeURIComponent(article.paper_DOI)}`, "_blank");
                                            }}
                                        >
                                            View Graph
                                        </Button>
                                    </div>
                                    <div className={"result-metadata"}>
                                        <h5 className={"heading"}>Authors: </h5>
                                        {authors.length > 0 ? (
                                            <div>
                                                {authors.map((author) => (
                                                    <a href={`/profile/${author[0]}`} className={"authors"} key={author[0]}>
                                                        <span>{author[1]},</span>
                                                    </a>
                                                ))}
                                            </div>
                                        ) : <span style={{marginLeft: '10px'}}>{article.authors.join(", ")}</span>}
                                        <div>
                                            <h5 className={"heading heading-extra"}>Published at: </h5>
                                            {article.paper_Journal.journalName} - {article.published_Date}
                                        </div>
                                        <div>
                                            <h5 className={"heading heading-extra"}>Citations: </h5>
                                            <a href={`results/${encodeURIComponent(article[0])}`} className={"publication-site"} target={"_blank"}>{citations[0].length}</a>
                                        </div>
                                        {topics.length > 0 ? (
                                            <div>
                                                <h5 className={"heading heading-extra"}>Topics Covered: </h5>
                                                {topics.map((topic, i) => (
                                                    <a href={"#"} className={"tags"} key={i}>
                                                        <span>{topic}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                });
                setArticlesState(articles);
            });
        }

    }, [data])
    const updateSearchParameter = async (e) =>{
        setSearchParameter({query: e.target.value})
    }
    const handleSelectedArticles = async (e, flag) => {
        if (flag === "find") {
            let updatedList = [...selectedArticles];

            if (e.target.checked) {
                updatedList = [...selectedArticles, e.target.value];
            } else {
                updatedList.splice(selectedArticles.indexOf(e.target.value), 1);
            }

            await setSelectedArticles(updatedList);
            e.target.checked = updatedList.includes(e.target.value);
        } else if (flag === "upload") {
            let updatedList = [...uploadedArticles];

            if (e.target.checked) {
                updatedList = [...uploadedArticles, e.target.value];
            } else {
                updatedList.splice(uploadedArticles.indexOf(e.target.value), 1);
            }

            await setUploadedArticles(updatedList);
            e.target.checked = updatedList.includes(e.target.value);
        }
    };
    const getSearchedData = async () =>{
        if(search.query.trim() === "") return
        setSelectedArticles([])
        const result = await getAllRequiredArticles(search.query, context.userLogIn.user_id, (findArticlePagination.activePage-1), findArticlePagination.elementsPerPage);
        let pages
        if(result.totalPages > 10){
            pages = 10
        }
        else{
            pages = result.totalPages
        }
        setFindArticlePagination(prevState => ({
            ...prevState,
            totalPages: pages,
            totalElements: result.totalElements,
            activePage: (result.pageable.pageNumber)+1,
            elementsPerPage: result.size
        }))
        await setData(result.content)
    }
    const updateArticles = async () =>{
        if(selectedArticles.length === 0){
            alert("No article Selected")
            return;
        }
        if(context.publisher.publisherID === 0){
            alert("Publisher Not Logged In")
            return;
        }
        const data = {
            publisherID: context.publisher.publisherID,
            articleIDs: selectedArticles
        }
        const response = await updateAddedArticles(data);
        if(response === 200){
            await setAlerts({
                success: true,
                error: false
            })
            await setSelectedArticles([])
            await setData([])
            await getArticlesAll();


        }
        else {
            setAlerts({
                success: false,
                error: true
            })
        }
    }
    const removeUploadedArticles = async () =>{
        if(uploadedArticles.length === 0){
            alert("No article Selected")
            return;
        }
        if(context.publisher.publisherID === 0){
            alert("Publisher Not Logged In")
            return;
        }
        const data = {
            publisherID: context.publisher.publisherID,
            articleIDs: uploadedArticles
        }
        const response = await deleteAuthorPapers(data);
        if(response === 200){
            try {
               await getAllUploadedArticlesByPublisher();
            } catch (error) {
                console.error(error);
            }
        }
        else {
            setAlerts({
                success: false,
                error: true
            })
        }
    }
    const updateFormValues = async (e) =>{
        const fieldName = e.target.name;
        await setFormState({...formState, [fieldName]:e.target.value})
    }
    const addAuthorName = async () => {
        if(formState.authorName.trim().length > 0) {
            if(authorName.includes(formState.authorName)) {
                await setFormState((prev) => ({...prev, authorName: ""}))

            }
            else{
                await setAuthorNames((prev) => [...prev, formState.authorName]);
                setFormState((prev) => ({...prev, authorName: ""}))
            }
        }
    }
    const removeAuthorNames = (index) => {
        setAuthorNames((prev) => prev.filter((_, i) => i !== index));
    }
    const displayAuthorNames = authorName.map((author, index) => {
        return (
            <span className={'tags form-tag'}>{author} <CloseButton onClick={()=>{
                removeAuthorNames(index)}} className={"close-button"}/></span>
        )
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

// Call the asynchronous function outside of the table component
    const addArticleData = tableData.map((articleData)=>{
        return(
            <tr>
                <td><
                    FormCheck
                    type={"checkbox"}
                    label={"Select"}
                    value={articleData[0]}
                    onChange={async (e)=>{ await handleSelectedArticles(e, "upload")}}

                /></td>
                <td>{articleData[1] === null ? "": articleData[0]}</td>
                <td>{articleData[2]}</td>
                <td>{articleData[3].slice(0, 250)+"...."}</td>
                <td>{articleData[4]}</td>
            </tr>
        )
    })
    // console.log(DataObjects)
    const updateFormState = async (e) =>{
        const fieldName = e.target.name
        await setFormState(prevState => ({...prevState, [fieldName]:e.target.value}))
    }
    const showTabData = (key) => {
        // if (key === "link-1") {
        //     setKey({
        //         personalArticles: true,
        //         addArticle: false,
        //         findArticle: false,
        //     })
        // } else
            if (key === "link-1") {
            setKey({
                // personalArticles: false,
                addArticle: true,
                findArticle: false,
            })
        } else if (key === "link-2") {
            setKey({
                // personalArticles: false,
                addArticle: false,
                findArticle: true,
            })
        }
    }
    async function saveArticle() {
        if(formState.DOI.trim() === "" || formState.Title.trim() === "" || formState.Abstract.trim() === ""
            || formState.Year === 0 || authorName.length === 0 || !formState.fileSelected){
            setAlerts(prevState => ({...prevState, formFields: true}))
            return;
        }
        const formData = new FormData();
        formData.append('file', formState.fileToUpload);
        formData.append('DOI', formState.DOI);
        formData.append('Title', formState.Title);
        formData.append('Abstract', formState.Abstract);
        formData.append('Year', formState.Year.toString());
        formData.append('JournalName', `${formState.JournalName.trim() === ""? "KnowledgeVerseJournal": formState.JournalName}`);
        formData.append('authorID', context.publisher.publisherID)
        for (const author of authorName) {
            formData.append('Authors', author);
        }
        const response = await saveUploadArticle(formData)
        if(response === httpStatusInternalServerError) await setAlerts(prevState => ({...prevState, fileUploadError: true, fileUploadSuccess: false}))
        else {
            await setAlerts(prevState => ({...prevState, fileUploadSuccess: true, fileUploadError: false}))
            await getAllUploadedArticlesByPublisher();
        }
    }

    return(
        <div className={"profile-articles"}>
            <h3>Research Work Information</h3>
            <div>
                <Nav fill variant={"tabs"} defaultActiveKey={"link-1"} onSelect={showTabData} style={{borderBottom:"unset"}}>
                    {/*<Nav.Item>*/}
                    {/*    <Nav.Link eventKey="link-1" className={"Tab-Option"}>Personal Articles</Nav.Link>*/}
                    {/*</Nav.Item>*/}
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" className={"Tab-Option"}>Add Article</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" className={"Tab-Option"}>Find Article</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div>
                {/*{key.personalArticles?<div className={"PersonalArticles"}>*/}
                {/*        <Form>*/}
                {/*            <Form.Group controlId={"formBasicCheckbox"}>*/}
                {/*                <h5>Articles Selected: 0</h5>*/}
                {/*                <Form.Check type={"checkbox"} label={"Select All"}/>*/}
                {/*            </Form.Group>*/}
                {/*            <Table striped hover>*/}
                {/*                <tr>*/}
                {/*                    <td>*/}
                {/*                        <Form.Check type={'checkbox'} className={"remove-select"}/>*/}
                {/*                    </td>*/}
                {/*                    <td>*/}
                {/*                        <div className={"result"}>*/}
                {/*                            <div className={"result-detail"}>*/}
                {/*                                <a href={"#"} className={"heading"}><h3>Energy and policy considerations for deep learning in NLP</h3></a>*/}
                {/*                                <p>Deep learning has revolutionized natural language processing (NLP), but its energy consumption is a growing concern. We present a comprehensive study of the energy consumption of deep learning models for NLP and discuss the implications for the field.</p>*/}
                {/*                            </div>*/}
                {/*                            <div className={"result-metadata"}>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading"}>Authors: </h5>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span> Hafiz Haseeb Ahmad Butt,</span></a>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span> Waleed Ahmed Shahid,</span></a>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span> Sanaullah Kalasra</span></a>*/}
                {/*                                </div>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading heading-extra"}>Published at: </h5>*/}
                {/*                                    IEEE Computational intelligence - 2014 <a href={"#"}  className={"authors"}><span>ieeexplore.ieee.org</span></a>*/}
                {/*                                </div>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading"}>Cited By: </h5>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span>255</span></a>*/}
                {/*                                </div>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                            /!*<Button variant={"primary"} className={"remove-button"}>Remove Articel</Button>*!/*/}
                {/*                        </div>*/}
                {/*                    </td>*/}
                {/*                </tr>*/}
                {/*                <tr>*/}
                {/*                    <td>*/}
                {/*                        <Form.Check type={'checkbox'} className={"remove-select"}/>*/}
                {/*                    </td>*/}
                {/*                    <td>*/}
                {/*                    <div className={"result"}>*/}
                {/*                            <div className={"result-detail"}>*/}
                {/*                                <a href={"#"} className={"heading"}><h3>Energy and policy considerations for deep learning in NLP</h3></a>*/}
                {/*                                <p>Deep learning has revolutionized natural language processing (NLP), but its energy consumption is a growing concern. We present a comprehensive study of the energy consumption of deep learning models for NLP and discuss the implications for the field.</p>*/}
                {/*                            </div>*/}
                {/*                            <div className={"result-metadata"}>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading"}>Authors: </h5>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span> Hafiz Haseeb Ahmad Butt,</span></a>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span> Waleed Ahmed Shahid,</span></a>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span> Sanaullah Kalasra</span></a>*/}
                {/*                                </div>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading heading-extra"}>Published at: </h5>*/}
                {/*                                    IEEE Computational intelligence - 2014 <a href={"#"}  className={"authors"}><span>ieeexplore.ieee.org</span></a>*/}
                {/*                                </div>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading"}>Cited By: </h5>*/}
                {/*                                    <a href={"#"}  className={"authors"}><span>255</span></a>*/}
                {/*                                </div>*/}
                {/*                                <div>*/}
                {/*                                    <h5 className={"heading heading-extra"}>Topics Covered: </h5>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >NLP</span></a>*/}
                {/*                                    <a href={"#"} className={'tags'}><span >Biotech</span></a>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </td>*/}
                {/*                </tr>*/}
                {/*            </Table>*/}
                {/*            <Button variant={"primary"} className={"remove-button"}>Remove Articles</Button>*/}
                {/*        </Form>*/}
                {/*    </div> :""}*/}
                {key.addArticle? <div>
                        {alerts.success?<Alert variant={"success"}>Author Articles List Updated Successfully</Alert>:""}
                        {alerts.error?<Alert variant={"danger"}>Error in Adding Article to Your Account</Alert>:""}
                        {alerts.formFields?<Alert variant={"danger"}>Some of the Required fields are empty.</Alert>:""}
                        {alerts.incorrectFileSelected?<Alert variant={"danger"}>Selected File Format Not Supported.</Alert>:""}
                        {alerts.fileUploadError?<Alert variant={"danger"}>Can't Upload Article Right Now</Alert>:""}
                        {alerts.fileUploadSuccess?<Alert variant={"success"}>Article Uploaded Successfully</Alert>:""}
                        <Button
                            variant={"primary"}
                            className={"articleUploadOption"}
                            onClick={()=>{setFileUploadForm(!fileUploadForm)}}
                        >Upload Article</Button>
                        {fileUploadForm?
                            <Form className={"upload-form"}>
                            <Form.Group className={"profile-articles-uploadform"}>
                                <Form.Label className={'formLabel'}>DOI <span className={"important-star"}>*</span></Form.Label>
                                <Form.Control className={"search-input-finding"} type="text"
                                              placeholder="Enter Paper DOI"
                                              required={true}
                                              value={formState.DOI}
                                              name={"DOI"}
                                              onChange={async (e)=>{
                                                  if(e.target.value.trim().length>100){
                                                      e.target.value = e.target.value.slice(0,100);
                                                  }
                                                  await updateFormState(e)

                                              }}
                                />
                            </Form.Group>
                            <Form.Group className={"profile-articles-uploadform"}>
                                <Form.Label className={'formLabel'}>Title <span className={"important-star"}>*</span></Form.Label>
                                <Form.Control className={"search-input-finding"} type="text"
                                              placeholder="Enter Paper Title"
                                              required={true}
                                              value={formState.Title}
                                              name={"Title"}
                                              onChange={async (e)=>{
                                                  if(e.target.value.trim().length>300){
                                                      e.target.value = e.target.value.slice(0,300);
                                                  }
                                                  await updateFormState(e)
                                              }}
                                />
                            </Form.Group>
                            <Form.Group className={"profile-articles-uploadform"}>
                                <Form.Label className={'formLabel'}>Abstract <span className={"important-star"}>*</span></Form.Label>
                                <Form.Control className={"search-input-finding"} as="textarea"
                                              placeholder="Enter Paper Abstract/Introduction"
                                              required={true}
                                              value={formState.Abstract}
                                              name={"Abstract"}
                                              onChange={async (e)=>{
                                                  if(e.target.value.trim().length>1000){
                                                      e.target.value = e.target.value.slice(0,1000);
                                                  }
                                                  await updateFormState(e)
                                              }}
                                />
                            </Form.Group>
                            <Form.Group className={"profile-articles-uploadform"}>
                                <Form.Label className={'formLabel'}>Year <span className={"important-star"}>*</span></Form.Label>
                                <Form.Control
                                    className={"search-input-finding"}
                                    type="number"
                                    placeholder="Pick Year"
                                    defaultValue={1950}
                                    min="1950" max={`${new Date().getFullYear()}`} step="1"
                                    required={true}
                                    value={formState.Year}
                                    name={"Year"}
                                    onChange={async (e)=>{
                                        await updateFormState(e)
                                    }}

                                />
                            </Form.Group>
                            <Form.Group className={"profile-articles-uploadform"}>
                                <Form.Label className={'formLabel'}>Journal Name </Form.Label>
                                <Form.Control className={"search-input-finding"} type="text"
                                              placeholder="Enter Paper Journal"
                                              name={"JournalName"}
                                              value={formState.JournalName}
                                              onChange={async (e)=>{
                                                  if(e.target.value.trim().length>100){
                                                      e.target.value = e.target.value.slice(0,100);
                                                  }
                                                  await updateFormState(e)
                                              }}
                                />
                            </Form.Group >
                                <FormGroup className={"profile-articles-uploadform"}>
                                <Form.Label className={'formLabel'}>Enter Author Names <span className={"important-star"}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Add other names you have published"
                                    className={"middle-search-input profile-input"}
                                    onChange={async (e)=>{await updateFormValues(e)}}
                                    name={"authorName"}
                                    value={formState.authorName}

                                />
                                <Button variant={"primary"} className={"personal-profile-update-button"}
                                        onClick={addAuthorName}
                                >Add</Button>
                                <div style={{clear:"right"}}></div>
                                <div className={"tags-dive"}>
                                    {displayAuthorNames}
                                </div>
                                </FormGroup>
                            <Form.Group className={"profile-articles-uploadform"}>
                                <Form.Label>Upload Article File <span className={"important-star"}>*</span></Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Attach File"
                                    name={"fileToUpload"}
                                    // value={formState.fileToUpload}
                                    onChange={async (e)=>{
                                        const file = e.target.files[0];
                                        if(file.type === "application/pdf"){
                                            await setFormState(prevState => ({...prevState,fileToUpload: file, fileSelected: true}))
                                        }
                                        else{
                                            setAlerts(prevState => ({...prevState, incorrectFileSelected: true}))
                                        }
                                    }}
                                    accept={"application/pdf"}
                                />
                            </Form.Group>
                            <Form.Group className={"form-button"}>
                                <Button
                                    variant={"primary"}
                                    onClick={async ()=>{
                                        await saveArticle()
                                    }}> Upload</Button>
                            </Form.Group>
                            {/*<FormFileInput*/}
                        </Form>: ""}
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    {/*<th><FormCheck type={"checkbox"} label={"Select All"}/></th>*/}
                                    <th></th>
                                    <th>Date of Upload</th>
                                    <th>Title</th>
                                    <th>Abstract</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {addArticleData}
                                </tbody>
                            </Table>
                            <Pagination size="sm">{uploadItems}</Pagination>
                            <Button
                                variant={"primary"}
                                className={"remove-button"}
                                onClick={async ()=> {await removeUploadedArticles()}}
                            >Remove Selected Articles</Button>
                    </div>:""}
                {key.findArticle? <div>
                    <Form>
                        <InputGroup className={"profile-articles-finding"}>
                                <Form.Control
                                    className={"search-input-finding"}
                                    type="text"
                                    value={search.query}
                                    onChange={async (e)=>{
                                        await updateSearchParameter(e)
                                    }}
                                    placeholder="Find through paper Title" />
                                <Button
                                    variant={"primary"}
                                    onClick={async ()=>{
                                        await getSearchedData()
                                    }}
                                    className={"search-button-finding"}
                                >Search</Button>
                        </InputGroup>
                    </Form>
                        {alerts.success?<Alert variant={"success"}>Author Articles List Updated Successfully</Alert>:""}
                        {alerts.error?<Alert variant={"danger"}>Error in Adding Article to Your Account</Alert>:""}
                        <div>
                                <Form.Group controlId={"formBasicCheckbox"}>
                                    <h5>Articles Selected: {selectedArticles.length}</h5>
                                </Form.Group>
                            <Table className={"profile-articles-finding-table"}>
                                {articlesStat}
                            </Table>
                                <Pagination size="sm">{items}</Pagination>
                                <Button
                                    variant={"primary"}
                                    className={"remove-button"}
                                    onClick={async ()=> {await updateArticles()}}
                                >Add Articles</Button>

                        </div>
                </div> :""}
            </div>
        </div>
    )
}