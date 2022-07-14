import { useEffect, useRef, useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../../firebase';
import CommentPopup from '../GroupComponents/CommentPopup';
import CommentsBlock from './CommentsBlock';

export default function Circle({
  index,
  projectIndex,
  statuses,
  statusId,
  params,
  comments,
  singleProject,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [posXY, setPosXY] = useState({ x: 0, y: 0 });
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isCommentsBlockVisible, setIsCommentsBlockVisible] = useState(false);

  const refCircle = useRef();
  const contextMenuRef = useRef();

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
  const addComments = text => {
    set(
      ref(db, `${params}/students/${index}/projects/${projectIndex}/comment`),
      text
    );
  };

  return (
    <>
      <div
        ref={refCircle}
        className='circle'
        onClick={() => setIsCommentsBlockVisible(true)}
        style={{
          backgroundColor: `${
            statuses.find(singleColor => singleColor.id === statusId).color
          }`,
        }}
      >
        {comments && (
          <div
            className='comment-number'
            style={{
              borderColor: `${
                statuses.find(singleColor => singleColor.id === statusId).color
              }`,
            }}
          >
            {comments.length}
          </div>
        )}
      </div>
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
          <button
            className='btn-context add-comment'
            onClick={() => setIsPopUpVisible(true)}
          >
            Add Comment
          </button>
        </div>
      )}
      {isPopUpVisible && (
        <CommentPopup
          setIsPopUpVisible={setIsPopUpVisible}
          addComments={addComments}
          comments={comments}
        />
      )}
      {isCommentsBlockVisible && comments !== '' && (
        <CommentsBlock
          setIsCommentsBlockVisible={setIsCommentsBlockVisible}
          comments={comments}
          singleProject={singleProject}
        />
      )}
    </>
  );
}
