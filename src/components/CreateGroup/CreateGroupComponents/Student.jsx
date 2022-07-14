import { BsPencil } from 'react-icons/bs';
import { FaUserMinus } from 'react-icons/fa';

export default function Student({ student, index, setNewGroup, newGroup }) {
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
