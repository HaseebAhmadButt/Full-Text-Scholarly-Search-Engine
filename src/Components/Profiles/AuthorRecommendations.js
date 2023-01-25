import React from "react";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
import RecommendedAuthors from "./RecommendedAuthors";
export default function ResultsShowingSearchRecommendation() {
    return(
        <>
            <div className={"author-recommendations"}>
                <h3>Author Recommendations</h3>
                <div className={"recommendation-div"}>

                <RecommendedAuthors />
                <RecommendedAuthors />
                <RecommendedAuthors />
                <RecommendedAuthors />
                </div>
            </div>
        </>
    )
}