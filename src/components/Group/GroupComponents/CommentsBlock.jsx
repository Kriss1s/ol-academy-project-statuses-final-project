import { useRef, useEffect } from 'react';

import './CommentsBlock.scss';

export default function CommentsBlock({
  setIsCommentsBlockVisible,
  comments,
  singleProject,
}) {
  const refPopup = useRef();

  useEffect(() => {
    const handleCheck = e => {
      if (refPopup.current && !refPopup.current.contains(e.target)) {
        setIsCommentsBlockVisible(false);
      }
    };

    document.addEventListener('click', handleCheck, true);
    return () => {
      document.removeEventListener('click', handleCheck, true);
    };
  }, [setIsCommentsBlockVisible]);

  return (
    <div className='comments-block-wrapper'>
      <div className='comments-block-container' ref={refPopup}>
        <h3 className='comment-heading'>{singleProject.projectName} </h3>
        <div className='comments-block'>
          {comments.map(comment => (
            <div className='comment-text'>{comment}</div>
          ))}
        </div>
        <button
          className='close-comm-btn '
          onClick={() => {
            setIsCommentsBlockVisible(false);
          }}
        >
          close
        </button>
      </div>
    </div>
  );
}
