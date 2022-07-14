import { useNavigate } from 'react-router-dom';
import './StartCreate.scss';
export default function StartCreate() {
  const navigate = useNavigate();

  return (
    <button
      className='start-button'
      onClick={() => navigate('/search', { replace: true })}
    >
      Create Group
    </button>
  );
}
