import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';

import { BallTriangle } from 'react-loader-spinner';
import Circle from '../components/GroupComponents/Circle';
import './Group.scss';
export default function Group() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [currentGroup, setCurrentGroup] = useState({});

  let params = useParams();

  const getData = () => {
    onValue(ref(db, `${params.groupsId}/`), snapshot => {
      const data = snapshot.val();
      console.log(data);
      if (data !== null) {
        setIsLoading(false);
        setCurrentGroup({ ...data });
      } else {
        navigate('/*');
      }
    });
  };
  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <>
        <BallTriangle
          height='150'
          width='150'
          color='#2e82ed'
          ariaLabel='loading'
        />
        <p className='loader-text'>Loading...</p>
      </>
    );
  }
  return (
    <div className='wrapper'>
      <div div className='statuses'>
        {Object.values(currentGroup.statuses).map(singleColor => (
          <div className='color-meaning-wrappers'>
            <div
              className='color-meaning'
              style={{ backgroundColor: singleColor.color }}
            >
              {''}
            </div>
            <p>{singleColor.meaning}</p>
          </div>
        ))}
      </div>
      <ul className='table'>
        <li
          className='table-header'
          style={{
            maxWidth: `${100 / (currentGroup.students.length + 1)}%`,
          }}
        >
          <div className='project-name'>{''}</div>
          {currentGroup?.projects?.map(project => (
            <div className='project-name'>{project.projectName}</div>
          ))}
        </li>
        {currentGroup?.students?.map((student, studentIndex) => {
          const { name: studentName, projects: studentProjects } = student;
          return (
            <li
              className='table-row'
              style={{
                maxWidth: `${100 / (currentGroup.students.length + 1)}%`,
              }}
            >
              <div className='table-row-element'>{studentName}</div>
              {studentProjects.map((singleProject, projectIndex) => (
                <div className='table-row-element'>
                  <Circle
                    params={params.groupsId}
                    index={studentIndex}
                    projectIndex={projectIndex}
                    statuses={currentGroup.statuses}
                    {...singleProject}
                    currentGroup={currentGroup}
                    comments={singleProject.comment}
                  />
                </div>
              ))}
            </li>
          );
        })}
      </ul>
      {/* {isCommentPopUpVisible && (
        <ReadComments
          setIsCommentPopUpVisible={setIsCommentPopUpVisible}
          // addComments={addComments}
          // comments={comments}
        />
      )} */}
    </div>
  );
}
