import { useRef, useEffect, useState } from 'react';

import './CommentPopup.scss';

export default function CommentPopup({
  setIsPopUpVisible,
  comments,
  addComments,
}) {
  const [commentText, setCommentText] = useState('');
  const refPopup = useRef();

  const saveComment = () => {
    let text;
    if (comments === '') {
      text = [commentText];
    } else {
      text = [...comments, commentText];
    }

    addComments(text);
    setCommentText('');
    setIsPopUpVisible(false);
  };

  useEffect(() => {
    const handleCheck = e => {
      if (refPopup.current && !refPopup.current.contains(e.target)) {
        setIsPopUpVisible(false);
      }
    };

    document.addEventListener('click', handleCheck, true);
    return () => {
      document.removeEventListener('click', handleCheck, true);
    };
  }, [setIsPopUpVisible]);

  return (
    <div className='popup-wrapper'>
      <div className='popup-container' ref={refPopup}>
        <h3 className='popup-comment-message'>Add you comment</h3>
        <textarea
          className='comment'
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        ></textarea>
        <div className='popup-btn-wrapper'>
          <button className='comm-btn' onClick={saveComment}>
            save
          </button>
          <button
            className='comm-btn '
            onClick={() => {
              setCommentText('');
              setIsPopUpVisible(false);
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
