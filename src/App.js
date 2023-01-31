import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './Styles/Common/Header.css';
import './Styles/Common/Footer.css';
import './Styles/Profiles/ProfileResultsHeader.css';
import './Styles/Home-page/Search-Header.css';
import './Styles/Profiles/ProfileResultsFilter.css';
import './Styles/Profiles/AuthorRecommendations.css';
import './Styles/Profiles/User Profile/UpdateResearcherInformation.css';
import './Styles/Profiles/User Profile/UserProfileOptions.css';
import './Styles/Profiles/User Profile/General.css';
import './Styles/Profiles/User Profile/UpdatePersonalInformation.css';
import './Styles/Profiles/User Profile/ProfileArticles.css';
import './Styles/Profiles/User Profile/Metrics.css';
import './Styles/Profiles/User Profile/Charts.css';
import './Styles/Admin/Admin-Charts.css';

import Header from'./Components/Common/Header';
import Footer from './Components/Common/Footer';
import SearchArea from "./Components/Home-Page/Search-Header";
import RecentPapers from "./Components/Home-Page/Recent-Papers"
import ResultsShowing from "./Components/Result Page/ResultsShowing"
import MiddleSearchArea from "./Components/Result Page/Search-Area";
import ProfileResults from "./Components/Profiles/ProfileResults";
import PersonalProfile from "./Components/Profiles/User Profile/PersonalProfile";
import AdminHome from "./Components/Admin/Admin-Home";
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header />
        <Routes >
            <Route exact path={'/'} element={<>
                <SearchArea />
                <RecentPapers />
            </>} />

            <Route path={'/results'} element={<>
                <MiddleSearchArea />
                <hr/>
                <ResultsShowing />
                </>
            } />


            <Route path={'/profile'} element={
                <ProfileResults />
            } />

            <Route path={'/personalProfile'} element={
                <PersonalProfile />
            } />

            <Route path={'/admin'} element={
                <AdminHome />
            } />

        </Routes>
        <Footer />

    </div>
  );
}

export default App;
