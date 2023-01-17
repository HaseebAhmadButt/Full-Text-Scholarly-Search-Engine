import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './Styles/Common/Header.css';
import './Styles/Common/Footer.css';
import Header from'./Components/Common/Header';
import Footer from './Components/Common/Footer';
function App() {
  return (
    <div className="App">
        <Header />
        <Footer />
    </div>
  );
}

export default App;
