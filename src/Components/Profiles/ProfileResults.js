import React from "react";
import ResultProfileHeader from "./ResultProfileHeader";
import ResultsShowingSearch from "./ResultProfileSearch";
import ResultsShowing from "../Result Page/ResultsShowing";
import ResultsShowingSearchRecommendation from "./AuthorRecommendations";
export default function ProfileResults() {
    return (
            <>
                <div className={"main-user-profile"}>
                    <ResultProfileHeader />
                <ResultsShowingSearch />
                  <ResultsShowing />
                <hr/>
                <ResultsShowingSearchRecommendation />
                </div>
            </>
    );

}

