import { useState } from 'react';

export default function AddStudent({ newGroup, setNewGroup }) {
  const [currentStudent, setCurrentStudent] = useState('');
  const [warning, setWarning] = useState(false);
  const addCurrentStudent = () => {
    if (currentStudent === '') {
      setWarning(true);
    } else {
      const id = newGroup.students.length + 1;
      const updateGroup = [...newGroup.students];
      updateGroup.push({ id, name: currentStudent });
      console.log(updateGroup);
      setNewGroup({
        ...newGroup,
        students: [...updateGroup],
      });
      setCurrentStudent('');
    }
  };
  return (
    <>
      <div className='student-name-wrapper'>
        <input
          className='student-name'
          name='student-name'
          type='text'
          value={currentStudent}
          placeholder='Name'
          onChange={e => {
            warning && setWarning(false);

            setCurrentStudent(e.target.value);
          }}
        ></input>
        <button className='student-button' onClick={addCurrentStudent}>
          add
        </button>
      </div>
      {warning && <p className='name-error'>Choose another name</p>}
    </>
  );
}
