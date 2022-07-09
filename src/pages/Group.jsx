import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref, set } from 'firebase/database';
import './Group.scss';
export default function Group() {
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
    console.log(currentGroup.students);
  }, []);
  return (
    <div className='wrapper'>
      <ul className='table'>
        <li className='table-header'>
          <div className='project-name'>{''}</div>
          {currentGroup?.projects?.map(project => (
            <div className='project-name'>{project.projectName}</div>
          ))}
        </li>
        {currentGroup?.students?.map(student => {
          const { name: studentName, projects: studentProjects } = student;
          return (
            <li className='table-row'>
              <div className='table-row-element'>{studentName}</div>
              {studentProjects.map(singleProject => (
                <div className='table-row-element'>
                  <div
                    className='circle'
                    style={{
                      backgroundColor: `${
                        currentGroup.statuses.find(
                          singleColor =>
                            singleColor.id === singleProject.statusId
                        ).color
                      }`,
                    }}
                  ></div>
                </div>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
