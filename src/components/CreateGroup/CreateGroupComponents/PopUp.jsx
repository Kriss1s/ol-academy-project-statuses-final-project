import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';

import { db } from '../../../firebase';
import './PopUp.scss';

export default function PopUp({
  setIsPopUpVisible,
  clearLocalStorage,
  newGroup,
}) {
  const refPopup = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheck = e => {
      if (refPopup.current && !refPopup.current.contains(e.target)) {
        setIsPopUpVisible(false);
      }
    };

    document.addEventListener('click', handleCheck, true);
    return () => {
      document.removeEventListener('click', handleCheck, true);
    };
  }, [setIsPopUpVisible]);

  const handleSaveGroup = () => {
    let newProjects = newGroup.projects;
    newProjects = newProjects.map(project => {
      return { ...project, statusId: 100, comment: '' };
    });
    const students = newGroup.students.map(item => {
      return { ...item, projects: [...newProjects] };
    });

    const currentGroup = { ...newGroup, students };
    const newName = currentGroup.groupName.split(' ').join('').toLowerCase();
    console.log(currentGroup);

    set(ref(db, `${newName}/`), currentGroup);
    clearLocalStorage();
    setIsPopUpVisible(false);
    navigate('/');
  };

  return (
    <div className='popup-wrapper'>
      <div className='popup-container' ref={refPopup}>
        <h3 className='popup-message'>Do you want to save current group?</h3>
        <button className='btn popup-btn' onClick={handleSaveGroup}>
          Yes
        </button>
        <button
          className='btn popup-btn'
          onClick={() => {
            clearLocalStorage();
            setIsPopUpVisible(false);
            navigate('/');
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
