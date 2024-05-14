import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  const history = useHistory();
  let content;

  if (ctx.isLoggedIn) {
    content = (
      <>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button
            onClick={() => {
              history.push('/auth');
              ctx.logout();
            }}
          >
            Logout
          </button>
        </li>
      </>
    );
  } else {
    content = (
      <li>
        <Link to="/auth">Login</Link>
      </li>
    );
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>{content}</ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
