import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { db } from './firebase';
import ChoicePage from './pages/ChoicePage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <ChoicePage />
    </div>
  );
}

export default App;
