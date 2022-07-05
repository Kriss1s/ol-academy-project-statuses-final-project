import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { db } from './firebase';
import ChoicePage from './pages/ChoicePage';
import './App.scss';
import { onValue, ref } from 'firebase/database';

function App() {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map(newClass => setClasses([...classes, newClass]));
      }
    });
    console.log(classes);
  }, []);

  return (
    <div className='App'>
      <nav>
        <div>ttt</div>
        <div>ttt</div>
        <div>ttt</div>
        <div>ttt</div>
      </nav>
      {classes.map(item => (
        <p>{item.nino}</p>
      ))}
      <ChoicePage />
    </div>
  );
}

export default App;
