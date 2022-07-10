import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import './AllGroups.scss';

export default function AllGroups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
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
      {groups.map(group => (
        <div
          className='group-container'
          key={group.id}
          onClick={() => {
            navigate(`${group.groupName}`);
          }}
        >
          {group.groupName}
        </div>
      ))}
    </div>
  );
}
