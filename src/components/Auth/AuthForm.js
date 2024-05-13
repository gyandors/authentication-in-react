import { useHistory } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const ctx = useContext(AuthContext);

  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      (async function userLogin() {
        setIsLoading(() => true);

        try {
          const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBp62gfGdLcr8Nq08w32S5wk67nFHDdT_A',
            {
              method: 'POST',
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(response);

          const data = await response.json();
          if (response.ok) {
            console.log(data.idToken);
            ctx.login(data.idToken);
            history.push('/profile');
          } else {
            console.log(data);
            throw new Error(data.error.message);
          }
        } catch (error) {
          console.error(error);
          alert(error.message);
        }

        setIsLoading(() => false);
      })(); //Self-invoking function
    } else {
      (async function userSignup() {
        setIsLoading(() => true);

        try {
          const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBp62gfGdLcr8Nq08w32S5wk67nFHDdT_A',
            {
              method: 'POST',
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(response);

          const data = await response.json();
          if (response.ok) {
            console.log(data);
          } else {
            // console.log(data);
            throw new Error(data.error.message);
          }
        } catch (error) {
          console.error(error);
          alert(error.message);
        }

        setIsLoading(() => false);
      })(); //Self-invoking function
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p>Sending request...</p>
          ) : (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
