import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateGroup from './pages/CreateGroup';
import StartCreate from './pages/StartCreate';
import AllGroups from './pages/AllGroups';
import Group from './pages/Group';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route index element={<StartCreate />}></Route>
            <Route path='groups' element={<AllGroups />}>
              <Route path=':groupsId' element={<Group />}></Route>
            </Route>
            <Route path='search' element={<CreateGroup />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
