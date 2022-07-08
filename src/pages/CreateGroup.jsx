import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { onValue, ref, set } from 'firebase/database';
import { BsPencil } from 'react-icons/bs';
import { FaUserMinus } from 'react-icons/fa';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';

import GroupName from '../components/groupName';
import AddStudent from '../components/AddStudent';
import './CreateGroup.scss';
const progressSteps = ['projectName', 2, 3, 4];
const getLocalStorage = () => {
  let currentGroup = localStorage.getItem('currentGroup');
  if (currentGroup) {
    return JSON.parse(localStorage.getItem('currentGroup'));
  } else {
    return { groupName: '', students: [] };
  }
};

export default function CreateGroup() {
  const [newGroup, setNewGroup] = useState(getLocalStorage());
  const [progressStep, setProgressStep] = useState(1);
  const [groupNames, setGroupNames] = useState([]);
  const [isNameError, setIsNameError] = useState(false);

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
        groupNames.every(name => name !== newGroup.groupName)
          ? (num += 1)
          : setIsNameError(true);
      } else if (num === 2) {
        Object.keys(newGroup.students).length >= 1 && (num += 1);
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
            style={{ width: `${(progressStep / progressSteps.length) * 100}%` }}
            className='progress-line'
          ></div>
        </div>
        <span>{(progressStep / progressSteps.length) * 100}%</span>
        <button
          className={`btn-progress ${progressStep >= 4 ? 'disabled' : ''}`}
          disabled={progressStep >= 4 ? true : false}
          onClick={() => handleButtonClick('next')}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </section>
  );
}

function Student({ student, index, setNewGroup, newGroup }) {
  const deleteStudent = student => {
    const newStudentList = newGroup.students.filter(
      item => item.id !== student.id
    );
    console.log(student);
    setNewGroup({ ...newGroup, students: [...newStudentList] });
  };
  return (
    <div className='student'>
      <div>{student.name}</div>
      <div className='btn-student-container'>
        <button className='btn-student'>
          <BsPencil />
        </button>
        <button className='btn-student' onClick={() => deleteStudent(student)}>
          <FaUserMinus />
        </button>
      </div>
    </div>
  );
}
