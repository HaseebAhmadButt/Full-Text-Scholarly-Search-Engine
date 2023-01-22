import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './Styles/Common/Header.css';
import './Styles/Common/Footer.css';
import './Styles/Profiles/ProfileResultsHeader.css';
import './Styles/Home-page/Search-Header.css';
import './Styles/Profiles/ProfileResultsFilter.css';
import './Styles/Profiles/AuthorRecommendations.css';
import Header from'./Components/Common/Header';
import Footer from './Components/Common/Footer';
import SearchArea from "./Components/Home-Page/Search-Header";
import RecentPapers from "./Components/Home-Page/Recent-Papers"
import ResultsShowing from "./Components/Result Page/ResultsShowing"
import MiddleSearchArea from "./Components/Result Page/Search-Area";
import ProfileResults from "./Components/Profiles/ProfileResults";
function App() {
  return (
    <div className="App">
        <Header />
        {/*<SearchArea />*/}
        {/*<RecentPapers />*/}
        {/*<MiddleSearchArea />*/}
        {/*<hr/>*/}
        {/*<ResultsShowing />*/}
        <ProfileResults />
        <Footer />
    </div>
  );
}

export default App;
