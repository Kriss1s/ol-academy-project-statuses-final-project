import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { onValue, ref, set } from 'firebase/database';
import GroupName from '../components/groupName';
import './CreateGroup.scss';
const progressSteps = ['projectName', 2, 3, 4];
const getLocalStorage = () => {
  let currentGroup = localStorage.getItem('currentGroup');
  if (currentGroup) {
    return JSON.parse(localStorage.getItem('currentGroup'));
  } else {
    return { groupName: '', students: {} };
  }
};

export default function CreateGroup() {
  const [newGroup, setNewGroup] = useState(getLocalStorage());
  const [progressStep, setProgressStep] = useState(1);
  const [groupNames, setGroupNames] = useState([]);
  const [isNameError, setIsNameError] = useState(false);
  const [currentStudent, setCurrentStudent] = useState('');
  useEffect(() => {
    // console.log(classes);
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      console.log(Object.keys(data));
      if (data !== null) {
        setGroupNames([...Object.keys(data)]);
      }
    });
  }, []);
  useEffect(() => {
    console.log(Object.keys(newGroup.students));
    localStorage.setItem('currentGroup', JSON.stringify(newGroup));
  }, [newGroup]);

  const handleButtonClick = direction => {
    let num = progressStep;
    if (direction === 'prev') {
      num -= 1;
    } else if (direction === 'next') {
      if (num === 1) {
        newGroup.groupName &&
        groupNames.every(name => name !== newGroup.groupName)
          ? (num += 1)
          : setIsNameError(true);
      }
    }
    if (num > progressSteps.length) {
      num = progressSteps.length;
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
            newGroup={newGroup}
            setNewGroup={setNewGroup}
            isNameError={isNameError}
            setIsNameError={setIsNameError}
          />
        ) : progressStep === 2 ? (
          <>
            <p>Students</p>
            {Object.keys(newGroup.students).map((student, index) =>
              console.log('e')
            )}
            <AddStudent
              currentStudent={currentStudent}
              setCurrentStudent={setCurrentStudent}
            />
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
        >{`<`}</button>
        <div className='progress-line-container'>
          <div
            style={{ width: `${(progressStep / progressSteps.length) * 100}%` }}
            className='progress-line'
          ></div>
        </div>
        <span>{(progressStep / progressSteps.length) * 100}%</span>
        <button
          className={`btn-progress ${progressStep >= 4 ? 'disabled' : ''}`}
          disabled={progressStep >= 4 ? true : false}
          onClick={() => handleButtonClick('next')}
        >{`>`}</button>
      </div>
    </section>
  );
}
function AddStudent({ currentStudent, setCurrentStudent }) {
  return (
    <div className='student-name-wrapper'>
      <input
        className='student-name'
        name='student-name'
        type='text'
        value={currentStudent}
        placeholder='Name'
        onChange={e => {
          // setIsNameError(false);
          setCurrentStudent(e.target.value);
        }}
      ></input>
      <button className='student-button'>save</button>
      {/* {isNameError && <p className='name-error'>Choose another name</p>} */}
    </div>
  );
}
