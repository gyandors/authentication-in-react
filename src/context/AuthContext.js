import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

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
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('jwtToken');
  }

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      setToken(localStorage.getItem('jwtToken'));
    }
  }, []);

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
