import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import FooterComponent from './components/Footer.jsx';
import HeaderComponent from './components/Header.jsx';
import HeadSearch from "./pages/HeadSearch/HeadSearch.jsx";
import ByPartOfName from './pages/ByPartOfName.jsx';
import ByDay from './pages/ByDay.jsx';

import ByRangeOfValues from './pages/HeadSearch/ByObject/ByRangeOfValues.jsx';
import ByThePatient from './pages/HeadSearch/ByObject/ByThePatient.jsx';

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
               <Route path="*" element={<Navigate to="/search/byThePatient" />}
               />
            </Routes>
         </div>
         <FooterComponent />
      </Router>
   )
}

export default Routing;