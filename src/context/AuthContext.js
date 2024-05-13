import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ctxValue = {
    jwtToken: localStorage.getItem('jwtToken'),
    isLoggedIn: isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  function handleLogin(token) {
    localStorage.setItem('jwtToken', token);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  }

  console.log(ctxValue);

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
