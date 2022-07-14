import { Rings } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import './ErrorPage.scss';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className='error-container'>
      <Rings height='150' width='150' color='#2e82ed' ariaLabel='loading' />
      <div className='error-text-wrapper'>
        <div className='text-404'>404</div>
        <div className='error-text'>
          <h2>SORRY!</h2>
          <p>The Page You're Looking For Was Not Found</p>
        </div>
      </div>
      <button className='error-btn' onClick={() => navigate(`/`)}>
        Home
      </button>
    </div>
  );
}
