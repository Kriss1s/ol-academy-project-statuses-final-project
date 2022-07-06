import { useNavigate } from 'react-router-dom';
export default function StartCreate() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/search', { replace: true })}>
      Create Group
    </button>
  );
}
