import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './Styles/Common/Header.css';
import './Styles/Common/Footer.css';
import './Styles/Home-page/Search-Header.css';
import Header from'./Components/Common/Header';
import Footer from './Components/Common/Footer';
import SearchArea from "./Components/Home-Page/Search-Header";
import RecentPapers from "./Components/Home-Page/Recent-Papers"
import ResultsShowing from "./Components/Result Page/ResultsShowing"
function App() {
  return (
    <div className="App">
        <Header />
        <SearchArea />
        <RecentPapers />
        <ResultsShowing />
        <Footer />
    </div>
  );
}

export default App;
