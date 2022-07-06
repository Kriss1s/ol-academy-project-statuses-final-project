import { Outlet, NavLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='add'>Add Student</NavLink>
      </nav>
      <section className='main-content-container'>
        <Outlet />
      </section>
    </>
  );
}
