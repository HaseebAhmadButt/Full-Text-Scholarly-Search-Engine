import React from "react";
import ResultProfileHeader from "./ResultProfileHeader";
import ResultsShowingSearch from "./ResultProfileSearch";
import ResultsShowing from "../Result Page/ResultsShowing";
import ResultsShowingSearchRecommendation from "./AuthorRecommendations";
export default function ProfileResults(props) {
    const {settings} = props;
    // console.log(settings);
    return (
            <>
                <div className={"main-user-profile"}>
                    <ResultProfileHeader
                        functionCalled = {settings}
                    />
                        <ResultsShowingSearch />
                    <ResultsShowing />
                {/*<hr/>*/}
                {/*<ResultsShowingSearchRecommendation />*/}
                </div>
            </>
    );

}

