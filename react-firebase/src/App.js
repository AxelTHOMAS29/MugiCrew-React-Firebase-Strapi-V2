import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discussion from './page/Discussion';
import Histoire from './page/Histoire';
import PersonnageDetails from './page/PersonnageDetails';
import Home from './page/Home';
import LoginSignUp from './page/LoginSignUp';
import Personnages from './page/Personnages';
import HistoireDetails from './page/HistoireDetails';
import DiscussionDetails from './page/DiscussionDetails';

const App = () => {

  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/log" element={<Discussion />} />
            <Route path="/personnages" element={<Personnages />} />
            <Route path="/histoire" element={<Histoire />} />
            <Route path="/discussion" element={<LoginSignUp />} />
            <Route path="/details/:id" element={<PersonnageDetails />} />
            <Route path="/histoireDetail/:id" element={<HistoireDetails />} />
            <Route path="/discussionDetail/:id" element={<DiscussionDetails />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
