import { useState } from 'react';

export default function AddStudent({ newGroup, setNewGroup }) {
  const [currentStudent, setCurrentStudent] = useState('');
  const addCurrentStudent = () => {
    const id = newGroup.students.length + 1;
    const updateGroup = [...newGroup.students];
    updateGroup.push({ id, name: currentStudent });
    console.log(updateGroup);
    setNewGroup({
      ...newGroup,
      students: [...updateGroup],
    });
    setCurrentStudent('');
  };
  return (
    <div className='student-name-wrapper'>
      <input
        className='student-name'
        name='student-name'
        type='text'
        value={currentStudent}
        placeholder='Name'
        onChange={e => {
          setCurrentStudent(e.target.value);
        }}
      ></input>
      <button className='student-button' onClick={addCurrentStudent}>
        add
      </button>
    </div>
  );
}
