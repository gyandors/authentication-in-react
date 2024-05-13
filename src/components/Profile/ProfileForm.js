import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';
import { useRef, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const ctx = useContext(AuthContext);
  const history = useHistory();

  function handleFormSubmit(event) {
    event.preventDefault();

    const enteredPassword = newPasswordRef.current.value;

    (async function changePassword() {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBp62gfGdLcr8Nq08w32S5wk67nFHDdT_A',
          {
            method: 'POST',
            body: JSON.stringify({
              idToken: ctx.jwtToken,
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
          alert('Password changed successfully. Login again...');
          ctx.logout();
          history.push('/auth');
        } else {
          console.log(data);
          throw new Error(data.error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    })();
  }

  return (
    <form className={classes.form} onSubmit={handleFormSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
