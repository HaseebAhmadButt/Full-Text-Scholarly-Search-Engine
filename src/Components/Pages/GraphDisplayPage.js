import {GraphDisplay} from "../GraphDisplayComponent/Graphdisplay";
import {useNavigate, useParams} from "react-router-dom";
import {
    getCitations,
    getCitedPapers,
    getCitedPaperTitles
} from "../../Services/AuthorProfileServices/PublisherDataService";
import {useEffect, useState} from "react";


export const GraphDisplayPage = () =>{
    const navigator = useNavigate()
    const {paperID} = useParams()
    if(paperID==="") navigator("/")
    const decodedURI = decodeURIComponent(paperID)
    const [graphData, setGraphData] = useState({
        nodes: [],
        links: [],
        direction: 'target'
    })
    useEffect(()=>{

        getCitations(decodedURI).then(async (response) =>{
                let paperTitle = await getCitedPaperTitles(decodedURI);
                await setGraphData(prevState => ({
                    nodes: [...prevState.nodes, {
                        id: decodedURI,
                        name: paperTitle.Title
                    }],
                    links: prevState.links
                }));
                if (response.length) {
                    const fetchPaperTitles = response[0].map(async (item) => {
                        const paperTitle = await getCitedPaperTitles(item.paperId);
                        return {
                            id: item.paperId,
                            name: paperTitle.Title,
                        };
                    });

                    const fetchedNodes = await Promise.all(fetchPaperTitles);

                    const newLinks = response[0].map((item) => ({
                        source: item.paperId,
                        target: decodedURI,
                    }));

                    setGraphData((prevState) => ({
                        nodes: [...prevState.nodes, ...fetchedNodes],
                        links: [...prevState.links, ...newLinks],
                        direction: 'target'
                    }));
                }
        }
        )
        getCitedPapers(decodedURI).then(async (response)=>{
                if (response.length) {
                    const fetchPaperTitles = response[0].map(async (item) => {
                        const paperTitle = await getCitedPaperTitles(item.paperId);
                        return {
                            id: item.paperId,
                            name: paperTitle.Title,
                        };
                    });

                    const fetchedNodes = await Promise.all(fetchPaperTitles);

                    const newLinks = response[0].map((item) => ({
                        source: decodedURI,
                        target: item.paperId,
                    }));

                    setGraphData((prevState) => ({
                        nodes: [...prevState.nodes, ...fetchedNodes],
                        links: [...prevState.links, ...newLinks],
                        direction: 'target'
                    }));
                }
            }
        )
    },[])
    return(
        <GraphDisplay data={graphData}/>
    )
}