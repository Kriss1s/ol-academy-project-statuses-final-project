import { BiHomeHeart } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
export default function Navigation() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    console.log(windowSize);
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize]);
  return (
    <nav>
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
    </nav>
  );
}
