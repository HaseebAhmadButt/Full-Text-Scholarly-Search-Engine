import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './Styles/Headers/Header.css';
import './Styles/Common/Footer.css';
import './Styles/Common/Registration.css';
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
import './Styles/ContactUs/Contact.css';
import './Styles/AboutUs/AboutUs.css';
import './Styles/Headers/HomePageheader.css';
import './Styles/Headers/ProfileHeaders.css';
import './Styles/Home-page/TopCitedTopics.css';
import './Styles/Singlepaper/Singlepaper.css';

import {AdminPage} from "./Components/Pages/AdminPage";
import SearchHeader from './Components/Common/Headers/SearchHeader';
import HomepageHeader from "./Components/Common/Headers/HomePageHeader";
import Footer from './Components/Common/Footer';
import SearchArea from "./Components/Home-Page/Search-Header";
import RecentPapers from "./Components/Home-Page/Recent-Papers"
import ResultsShowing from "./Components/Result Page/ResultsShowing"
import MiddleSearchArea from "./Components/Result Page/Search-Area";
import {PersonalProfilePage, AuthorProfile} from "./Components/Pages/PersonalProfilePage";
import SignIn from "./Components/Common/SignIn";
import SignUp from "./Components/Common/SignUp";
import Contact from "./Components/ContactUs/Contact";
import AboutUs from "./Components/AboutUs/AboutUs";
import TopCitedTopic from "./Components/Home-Page/TopCitedTopic";
import TopCitedpapers from "./Components/Home-Page/TopCitedpapers";
import {Routes,Route} from "react-router-dom";
import ForgotPassword from "./Components/Common/ForgotPassword"
import {CitationsResultPages} from "./Components/Pages/CitationsResultPages";
import {SinglePaperPage} from "./Components/Pages/SinglePaperPage";
import {GraphDisplayPage} from "./Components/Pages/GraphDisplayPage";
import ProfileHeader from "./Components/Common/Headers/ProfileHeaders";
import {DOIs, articleObjects, sendArticleToController} from "./Sampe Data/DOIs";
function App() {
    articleObjects.map(async (article, index) => {
    await sendArticleToController(article, index);
});
  return (
    <div className="App">
        <Routes >
            <Route exact path={'/'} element={<>
                    <HomepageHeader/>
                    <SearchArea />
                    <TopCitedTopic />
                    <RecentPapers />
                    <TopCitedpapers />
                    {/*<RecommendedPapers />*/}
                    <div className={'about-us-new-beginning'}>
                        <h1>A New Beginning</h1>
                        <div className={'about-us-paragraph'}><p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
                                tincidunt lacinia, nunc est aliquam nisl, eu aliquet nisl nisl sit amet
                                mauris. Nullam euismod, nisl nec tincidunt lacinia, nunc est aliquam nisl, eu
                                aliquet nisl nisl sit amet mauris. Nullam euismod, nisl nec tincidunt
                                lacinia, nunc est aliquam nisl, eu aliquet nisl nisl sit amet mauris.
                                Nullam euismod, nisl nec tincidunt lacinia, nunc est aliquam nisl, eu
                                aliquet nisl nisl sit amet mauris. Nullam euismod, nisl nec tincidunt
                                lacinia, nunc est aliquam nisl, eu aliquet nisl nisl sit amet mauris.
                            </p></div>
                    </div>
                    <Footer />
            </>} />
            <Route path={'/results/:citations'} element={<>
                    <CitationsResultPages />
                </>} />
            <Route path={'/results'} element={<>
                    <SearchHeader />
                    <MiddleSearchArea />
                    <hr/>
                    {/*<ResultsShowing />*/}
                    <Footer />
            </>} />
            <Route path={'/singlePaper/:paperDOI'} element={<>
                <SearchHeader />
                <SinglePaperPage />
                <Footer />
            </>} />
            <Route path={'/profile/:authorID'} element={<AuthorProfile />} />
            <Route path={"/graph/:paperID"} element={<>
                <GraphDisplayPage />
            </>}/>
            <Route path={'/personalProfile'} element={<>
                <ProfileHeader />
                <PersonalProfilePage />
            </>} />
            <Route path={'/admin'} element={<AdminPage />} />
            <Route path={'/signIn'} element={<SignIn />} />
            <Route path={'/signUp'} element={<SignUp />} />
            <Route path={'/contact'} element={<><SearchHeader /><Contact /><Footer /></>} />
            <Route path={'/aboutUs'} element={<><SearchHeader /><AboutUs /><Footer /></>} />
            <Route path={'/changePassword'} element={<><ForgotPassword /></>} />
        </Routes>
    </div>
  );
}

export default App;
