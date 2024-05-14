import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  const isLoggedIn = !!token;

  const ctxValue = {
    jwtToken: token,
    isLoggedIn: isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  function handleLogin(token) {
    setToken(token);
    localStorage.setItem('jwtToken', token);

    setTimeout(() => {
      handleLogout();
    }, 300000);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('jwtToken');
  }

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
