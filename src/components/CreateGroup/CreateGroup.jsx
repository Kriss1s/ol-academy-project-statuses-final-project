import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';

import GroupName from './CreateGroupComponents/groupName';
import AddStudent from './CreateGroupComponents/AddStudent';
import Student from './CreateGroupComponents/Student';
import Color from './CreateGroupComponents/Color';
import AddProject from './CreateGroupComponents/AddProject';
import Project from './CreateGroupComponents/Project';
import PopUp from './CreateGroupComponents/PopUp';

import { db } from '../../firebase';
import { mainStatusColors } from '../../utilities/colors';
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
      statuses: [...mainStatusColors],
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
  const validName = groupNames.every(
    name => name !== newGroup.groupName.split(' ').join('').toLowerCase()
  );
  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();

      if (data !== null) {
        setGroupNames([...Object.keys(data)]);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('currentGroup', JSON.stringify(newGroup));
  }, [newGroup]);

  const handleButtonClick = direction => {
    let step = progressStep;
    if (direction === 'prev') {
      step -= 1;
    }
    if (direction === 'next') {
      if (step === 1) {
        newGroup.groupName && validName ? (step += 1) : setIsNameError(true);
      } else if (step === 2) {
        newGroup.students.length >= 1 && (step += 1);
      } else if (step === 3) {
        Object.values(newGroup.statuses).every(item => item.meaning !== '') &&
          (step += 1);
      } else if (step === 4) {
        newGroup.projects.length >= 1 && (step += 1);
      }
    }
    if (step > progressSteps) {
      step = progressSteps;
    }
    if (step < 1) {
      step = 1;
    }
    setProgressStep(step);
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
