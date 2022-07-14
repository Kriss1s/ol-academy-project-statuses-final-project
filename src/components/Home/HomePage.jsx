import { BiHomeHeart } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';

import { Outlet, NavLink } from 'react-router-dom';

import useWindowSize from '../../utilities/useWindowSize';
import './HomePage.scss';

export default function HomePage() {
  const windowSize = useWindowSize();

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'nav-link  active' : 'nav-link'
            }
          >
            <span className='nav-icon-wrapper'>
              <BiHomeHeart className='nav-icon' />
            </span>{' '}
            {windowSize >= 1025 && 'Home'}
          </NavLink>
          <NavLink
            to='groups'
            className={({ isActive }) =>
              isActive ? 'nav-link  active' : 'nav-link'
            }
          >
            <span className='nav-icon-wrapper'>
              <HiUserGroup className='nav-icon' />
            </span>
            {windowSize >= 1025 && 'Groups'}
          </NavLink>
        </div>
      </nav>
      <section className='main-content-container'>
        <Outlet />
      </section>
    </>
  );
}
