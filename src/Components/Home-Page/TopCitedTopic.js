import React, {useEffect, useState} from "react";
import {getTopics} from "../../Services/HomePageService/HomePageDataRetrieval";

const TopCitedTopic = () => {
        const [topics, setTopics] = useState([])

        useEffect(()=>{
                getTopics().then(async r => {await setTopics(r)})
        },[])
    return(
        <div className={"Searched-topics"}>
            <h5 className={"heading heading-extra"}>Top Research Topics: </h5>
            <div className="tags_wrapper">
                    {topics.map((topic)=>{return(<a href={"#"} className={'tags'}><span >{topic}</span></a>)})}
            </div>
        </div>
    )
}
export default TopCitedTopic;