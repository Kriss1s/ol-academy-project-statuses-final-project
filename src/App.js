import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import HomePage from './components/Home/HomePage';
import CreateGroup from './components/CreateGroup/CreateGroup';
import StartCreate from './components/StartCreate/StartCreate';
import AllGroups from './components/AllGroups/AllGroups';
import Group from './components/Group/Group';
import ErrorPage from './components/ErrorPage/ErrorPage';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route index element={<StartCreate />}></Route>
            <Route path='groups' element={<AllGroups />}></Route>
            <Route path='groups/:groupsId' element={<Group />}></Route>
            <Route path='search' element={<CreateGroup />}></Route>
          </Route>
          <Route path='*' exact={true} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
