import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';

import GroupName from '../components/groupName';
import AddStudent from '../components/AddStudent';
import Student from '../components/Student';
import Color from '../components/Color';
import AddProject from '../components/AddProject';
import Project from '../components/Project';
import PopUp from '../components/PopUp';
import './CreateGroup.scss';

const progressSteps = 5;

const getLocalStorage = () => {
  let currentGroup = localStorage.getItem('currentGroup');
  if (currentGroup) {
    return JSON.parse(localStorage.getItem('currentGroup'));
  } else {
    return {
      id: '',
      groupName: '',
      students: [],
      statuses: [
        { id: 100, color: '#ff5630', meaning: '' },
        { id: 200, color: '#c7c4bf', meaning: '' },
        { id: 300, color: '#f5c661', meaning: '' },
        { id: 400, color: '#4fb42b', meaning: '' },
      ],
      projects: [],
    };
  }
};

const clearLocalStorage = () => window.localStorage.removeItem('currentGroup');

export default function CreateGroup() {
  const [newGroup, setNewGroup] = useState(getLocalStorage());
  const [progressStep, setProgressStep] = useState(1);
  const [groupNames, setGroupNames] = useState([]);
  const [isNameError, setIsNameError] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  useEffect(() => {
    console.log(newGroup);
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      // console.log(Object.keys(data));
      if (data !== null) {
        setGroupNames([...Object.keys(data)]);
      }
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    console.log(newGroup);
    localStorage.setItem('currentGroup', JSON.stringify(newGroup));
  }, [newGroup]);

  const handleButtonClick = direction => {
    let num = progressStep;
    if (direction === 'prev') {
      num -= 1;
    } else if (direction === 'next') {
      if (num === 1) {
        newGroup.groupName &&
        groupNames.every(
          name => name !== newGroup.groupName.split(' ').join('').toLowerCase()
        )
          ? (num += 1)
          : setIsNameError(true);
      } else if (num === 2) {
        newGroup.students.length >= 1 && (num += 1);
      } else if (num === 3) {
        Object.values(newGroup.statuses).every(item => item.meaning !== '') &&
          (num += 1);
      } else if (num === 4) {
        newGroup.projects.length >= 1 && (num += 1);
      }
    }
    if (num > progressSteps) {
      num = progressSteps;
    }
    if (num < 1) {
      num = 1;
    }
    setProgressStep(num);
  };

  return (
    <section className='create-group-container'>
      <section className='info-box'>
        {progressStep === 1 ? (
          <GroupName
            groupNames={groupNames}
            newGroup={newGroup}
            setNewGroup={setNewGroup}
            isNameError={isNameError}
            setIsNameError={setIsNameError}
          />
        ) : progressStep === 2 ? (
          <>
            <p>Students</p>
            {/* {newGroup.students.length === 0 && ( */}
            <AddStudent setNewGroup={setNewGroup} newGroup={newGroup} />

            {newGroup.students.map((student, index) => (
              <Student
                key={student.id}
                student={student}
                newGroup={newGroup}
                setNewGroup={setNewGroup}
                index={index}
              />
            ))}
          </>
        ) : progressStep === 3 ? (
          <>
            {newGroup.statuses.map(chooseColor => (
              <Color
                key={chooseColor.id}
                {...chooseColor}
                newGroup={newGroup}
                setNewGroup={setNewGroup}
              />
            ))}
          </>
        ) : progressStep === 4 ? (
          <>
            <p>Projects</p>
            <AddProject setNewGroup={setNewGroup} newGroup={newGroup} />
            {newGroup.projects.map(project => (
              <Project
                key={project.id}
                {...project}
                newGroup={newGroup}
                setNewGroup={setNewGroup}
              />
            ))}
          </>
        ) : progressStep === 5 ? (
          <>
            <button
              className='btn-final'
              onClick={() => setIsPopUpVisible(true)}
            >
              Save This Group
            </button>
          </>
        ) : (
          <></>
        )}
      </section>
      <div className='progress'>
        <button
          className={`btn-progress ${progressStep <= 1 ? 'disabled' : ''}`}
          disabled={progressStep <= 1 ? true : false}
          onClick={() => handleButtonClick('prev')}
        >
          <MdArrowBackIosNew className='back-btn' />
        </button>
        <div className='progress-line-container'>
          <div
            style={{ width: `${(progressStep / progressSteps) * 100}%` }}
            className='progress-line'
          >
            <span>{(progressStep / progressSteps) * 100}%</span>
          </div>
        </div>

        <button
          className={`btn-progress ${
            progressStep >= progressSteps ? 'disabled' : ''
          }`}
          disabled={progressStep >= progressSteps ? true : false}
          onClick={() => handleButtonClick('next')}
        >
          <MdArrowForwardIos />
        </button>
      </div>
      {isPopUpVisible && (
        <PopUp
          setIsPopUpVisible={setIsPopUpVisible}
          clearLocalStorage={clearLocalStorage}
          newGroup={newGroup}
        />
      )}
    </section>
  );
}
