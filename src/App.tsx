import React, {Suspense} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import ProtectedRoute from './components/routes/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/pages/LoginPage';
import FundListPage from './components/pages/FundListPage';
import FundPage from './components/pages/FundPage';
import SignUpPage from "./components/pages/SignUpPage";
import AppLoader from "./components/ui/hoc/AppLoader";
import GuestRoute from "./components/routes/GuestRoute";

const HomePage = React.lazy(() => import(
  /* webpackChunkName: "[Home]" */
  './components/pages/HomePage'
))

function App() {

  return (
    <div className="app">
        <AppLoader>
            <Routes>
                <Route
                    path='/'
                    element={<ProtectedRoute route={
                        <Suspense fallback={<h4>Loading...</h4>}>
                            <HomePage/>
                        </Suspense>}/>} />
                <Route path="/funds" element={<FundListPage/>} />
                <Route path="/funds/:fundId" element={<FundPage/>} />
                <Route path="/login" element={<GuestRoute route={<LoginPage />} />} />
                <Route path="/signup" element={<GuestRoute route={<SignUpPage />} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <ToastContainer />
        </AppLoader>
    </div>
  );
}

export default App;
