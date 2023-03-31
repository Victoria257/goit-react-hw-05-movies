import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from 'components/SharedLayout/SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <>
      <header className={css.header}>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={css.navlink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={css.navlink}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
