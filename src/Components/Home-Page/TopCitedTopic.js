import React, {useEffect, useState} from "react";
import {getTopics} from "../../Services/HomePageService/HomePageDataRetrieval";
import {useNavigate} from "react-router-dom";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";
import {Alert} from "react-bootstrap";

const TopCitedTopic = () => {
        const [topics, setTopics] = useState([])
        const navigator = useNavigate()
    const [errors, setErrors] = useState({
        noData:false,
        serverError:false
    })

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await getTopics();
            if(response === httpStatusNotFound) {
                await setErrors({noData: true, serverError: false});
            } else if (response === httpStatusInternalServerError||response==="FETCH_ERROR") {
                await setErrors({noData: false, serverError: true});
            } else {
                await setTopics(response);
            }
        };
        fetchTopics().then();
    }, []);

    return(
        <div className={"Searched-topics"}>
            <h5 className={"heading heading-extra"}>Top Research Topics: </h5>
            {errors.noData?<Alert variant={"danger"}>No Data Found</Alert>:null}
            {errors.serverError?<Alert variant={"danger"}>Can't fetch Data Server Error</Alert>:null}
            { !errors.noData && !errors.serverError?<div className="tags_wrapper">
                    {topics.map((topic)=>{return(
                        <span
                            onClick={()=>{navigator(`/search/results/${topic}`)}}
                        className={'tags'}
                    >{topic}</span>)})}
            </div>:null}
        </div>
    )
}
export default TopCitedTopic;