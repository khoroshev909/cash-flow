import React from 'react';
import {Navbar} from "./components/ui/Navbar";
import {Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {HistoryPage} from "./pages/HistoryPage";
import {LoginPage} from "./pages/LoginPage";
import {FundPage} from "./pages/FundPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
        <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/history" element={<HistoryPage/>} />
            <Route path="/history/:fundId" element={<FundPage/>} />
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
