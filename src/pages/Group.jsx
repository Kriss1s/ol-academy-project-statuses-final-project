import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import Circle from '../components/Circle';
import './Group.scss';
export default function Group() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState({});
  let params = useParams();
  useEffect(() => {
    onValue(ref(db, `${params.groupsId}/`), snapshot => {
      const data = snapshot.val();
      console.log(data);
      if (data !== null) {
        setCurrentGroup({ ...data });
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [currentGroup]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='wrapper'>
      <ul className='table'>
        <li className='table-header'>
          <div className='project-name'>{''}</div>
          {currentGroup?.projects?.map(project => (
            <div className='project-name'>{project.projectName}</div>
          ))}
        </li>
        {currentGroup?.students?.map((student, studentIndex) => {
          const { name: studentName, projects: studentProjects } = student;
          return (
            <li className='table-row'>
              <div className='table-row-element'>{studentName}</div>
              {studentProjects.map((singleProject, projectIndex) => (
                <div className='table-row-element'>
                  <Circle
                    params={params}
                    index={studentIndex}
                    projectIndex={projectIndex}
                    statuses={currentGroup.statuses}
                    {...singleProject}
                    currentGroup={currentGroup}
                  />
                </div>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
