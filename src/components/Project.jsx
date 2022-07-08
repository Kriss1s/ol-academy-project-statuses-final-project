import { BsPencil } from 'react-icons/bs';
import { FaUserMinus } from 'react-icons/fa';
export default function Project({ projectName, id, newGroup, setNewGroup }) {
  const deleteProject = () => {
    const newProjectList = newGroup.projects.filter(item => item.id !== id);

    setNewGroup({ ...newGroup, projects: [...newProjectList] });
  };
  return (
    <div className='student'>
      <div>{projectName}</div>
      <div className='btn-student-container'>
        <button className='btn-student' onClick={() => deleteProject()}>
          <FaUserMinus />
        </button>
      </div>
    </div>
  );
}
