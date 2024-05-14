import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from './context/AuthContext';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!ctx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {ctx.isLoggedIn ? <UserProfile /> : <Redirect to="/auth" />}
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
