import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './HomePage.scss';

export default function HomePage() {
  return (
    <>
      <nav>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'nav-link  active' : 'nav-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to='search'
          className={({ isActive }) =>
            isActive ? 'nav-link  active' : 'nav-link'
          }
        >
          Groups
        </NavLink>
      </nav>
      <section className='main-content-container'>
        <Outlet />
      </section>
    </>
  );
}
