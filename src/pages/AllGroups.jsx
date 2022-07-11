import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref, remove } from 'firebase/database';

import './AllGroups.scss';

export default function AllGroups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  const deleteGroup = (e, currentGroup) => {
    e.stopPropagation();

    remove(ref(db, `${currentGroup.groupName}`));
    if (groups.length <= 1) {
      setGroups([]);
    }
  };
  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      console.log(data);
      if (data !== null) {
        setGroups([...Object.values(data)]);
      }
    });
    console.log(groups);
    // eslint-disable-next-line
  }, []);
  return (
    <div className='projects-container'>
      {groups !== null &&
        groups.map(group => {
          const students = Object.values(group.students);
          const color = Object.values(group.statuses);
          return (
            <div
              className='group-container'
              key={group.id}
              onClick={() => {
                const nameId = group.groupName
                  .split(' ')
                  .join('')
                  .toLowerCase();
                navigate(`${nameId}`);
              }}
            >
              <div className='shine'></div>

              <h3>{group.groupName}</h3>
              <p>Students: {students.length}</p>
              <p>Projects: {Object.values(group.projects).length}</p>
              <div>
                {color.map(singleColor => (
                  <div
                    className='color-show'
                    style={{ backgroundColor: singleColor.color }}
                  >
                    {''}
                  </div>
                ))}
              </div>
              <button
                className='btn-delete'
                onClick={e => deleteGroup(e, group)}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
}
