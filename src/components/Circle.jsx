import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';

const randomDarkColor = () => {
  let color = '#';
  for (let i = 0; i < 3; i++)
    color += (
      '0' + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};

export default function Circle({
  index,
  projectIndex,
  statuses,
  statusId,
  params,
  currentGroup,
}) {
  const color = randomDarkColor();
  const refCircle = useRef();
  const contextMenuRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [posXY, setPosXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log(currentGroup);
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
      if (
        !refCircle.current?.contains(e.target) &&
        !contextMenuRef.current?.contains(e.target)
      ) {
        setIsVisible(false);
      }
    };
    const handleclick = e => {
      if (!contextMenuRef.current?.contains(e.target)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('contextmenu', handleHideMenu);
    window.addEventListener('click', handleclick);

    return () => {
      window.removeEventListener('contextmenu', handleHideMenu);
      window.removeEventListener('click', handleclick);
    };
  }, [refCircle]);

  const changeColor = id => {
    set(
      ref(
        db,
        `${currentGroup.groupName}/students/${index}/projects/${projectIndex}/statusId`
      ),
      id
    );
  };

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
            color: `${color}`,
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
