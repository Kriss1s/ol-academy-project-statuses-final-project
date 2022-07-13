import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateGroup from './pages/CreateGroup';
import StartCreate from './pages/StartCreate';
import AllGroups from './pages/AllGroups';
import Group from './pages/Group';
import ErrorPage from './pages/ErrorPage';
import './App.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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
