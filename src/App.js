import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { db } from './firebase';
import { onValue, ref, set } from 'firebase/database';

import HomePage from './pages/HomePage';
import CreateGroup from './pages/CreateGroup';
import InformationPage from './pages/InformationPage';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route path='search' element={<CreateGroup />}></Route>
            {/* <Route path='add' element={<AddPage />}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
