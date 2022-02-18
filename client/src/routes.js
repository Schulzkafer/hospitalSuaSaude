import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header.jsx';
import FooterComponent from './components/Footer.jsx';
import HeadSearch from "./pages/HeadSearch/HeadSearch.jsx";
import ByThePatient from './pages/HeadSearch/ByObject/ByThePatient.jsx';
import ByRangeOfValues from './pages/HeadSearch/ByObject/ByRangeOfValues.jsx';
import ByPartOfName from './pages/ByPartOfName.jsx';
import ByDay from './pages/ByDay.jsx';
import Handbook from './pages/Handbook.jsx';


const Routing = () => {
   return (
      <Router>
         <div className='wrapper'>
            <HeaderComponent />
            <Routes>
               <Route path="/search" element={<HeadSearch />} >
                  <Route path="byThePatient" element={<ByThePatient />} />
                  <Route path="byRangeOfValues" element={<ByRangeOfValues />} />
               </Route>
               <Route path="/byPartOfName" element={<ByPartOfName />} />
               <Route path="/byDay" element={<ByDay />} />
               <Route path="/handbook" element={<Handbook />} />
               <Route path="*" element={<Navigate to="/search/byThePatient" />}
               />
            </Routes>
         </div>
         <FooterComponent />
      </Router>
   )
}

export default Routing;