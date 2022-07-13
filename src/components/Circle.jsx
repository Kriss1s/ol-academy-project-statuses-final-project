import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';

export default function Circle({
  index,
  projectIndex,
  statuses,
  statusId,
  params,
  currentGroup,
}) {
  const refCircle = useRef();
  const contextMenuRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [posXY, setPosXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    refCircle.current.addEventListener('contextmenu', e => {
      e.preventDefault();
      setIsVisible(true);
      setPosXY({ x: e.pageX, y: e.pageY });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleHideMenu = e => {
      e.preventDefault();
      console.log(statuses.find(singleColor => singleColor.id === statusId));
      if (
        !refCircle.current?.contains(e.target) &&
        !contextMenuRef.current?.contains(e.target)
      ) {
        setIsVisible(false);
      }
    };
    const handleClick = e => {
      if (!contextMenuRef.current?.contains(e.target)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('contextmenu', handleHideMenu);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('contextmenu', handleHideMenu);
      window.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line
  }, [refCircle]);

  const changeColor = id => {
    set(
      ref(db, `${params}/students/${index}/projects/${projectIndex}/statusId`),
      id
    );
  };
  // const addComment = id => {
  //   set(
  //     ref(db, `${params}/students/${index}/projects/${projectIndex}/statusId`),
  //     id
  //   );
  // };

  return (
    <>
      <div
        ref={refCircle}
        className='circle'
        style={{
          backgroundColor: `${
            statuses.find(singleColor => singleColor.id === statusId).color
          }`,
        }}
      ></div>
      {isVisible && (
        <div
          ref={contextMenuRef}
          className='context-menu'
          style={{
            position: 'absolute',
            top: `${posXY.y}px`,
            left: `${posXY.x}px`,
          }}
        >
          {statuses.map(status => (
            <button
              onClick={() => {
                changeColor(status.id);
                setIsVisible(false);
              }}
              className='btn-context'
              style={{
                border: `1px solid ${status.color}`,
                backgroundColor: `${status.color}`,
              }}
            >
              {status.meaning}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
