import { useState } from 'react';
export default function AddProject({ newGroup, setNewGroup }) {
  const [currentProject, setCurrentProject] = useState('');

  const addCurrentProject = () => {
    const id = newGroup.projects.length + 1;
    const updateProject = [...newGroup.projects];
    updateProject.push({ id, projectName: currentProject });
    console.log(updateProject);
    setNewGroup({
      ...newGroup,
      projects: [...updateProject],
    });
    setCurrentProject('');
  };
  return (
    <>
      <div className='student-name-wrapper'>
        <input
          className='student-name'
          name='student-name'
          type='text'
          value={currentProject}
          placeholder='Project Name'
          onChange={e => {
            setCurrentProject(e.target.value);
          }}
        ></input>
        <button className='student-button' onClick={addCurrentProject}>
          add
        </button>
        {/* {isNameError && <p className='name-error'>Choose another name</p>} */}
      </div>
    </>
  );
}
