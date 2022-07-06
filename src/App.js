import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { db } from './firebase';
import { onValue, ref, set } from 'firebase/database';

import HomePage from './pages/HomePage';
import CreateGroup from './pages/CreateGroup';
import StartCreate from './pages/StartCreate';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route index element={<StartCreate />}></Route>
            <Route path='search' element={<CreateGroup />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
