import { Outlet } from 'react-router-dom';

import Navigation from '../components/HomePageComponents/Navigation';
import './HomePage.scss';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <section className='main-content-container'>
        <Outlet />
      </section>
    </>
  );
}
