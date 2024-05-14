import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  const history = useHistory();

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {ctx.isLoggedIn && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    history.replace('/auth');
                    ctx.logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!ctx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
