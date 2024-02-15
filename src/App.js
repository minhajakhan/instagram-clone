import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes.js'
import UserContext from './context/user.js';
import useAuthListener from './hooks/use-auth-listener.js';

const Login = lazy(() => import('./pages/login.js'));
const SignUp = lazy(() => import('./pages/sign-up.js'));
const Dashboard = lazy(() => import('./pages/dashboard.js'));
const NotFound = lazy(() => import('./pages/not-found.js'));

export default function App() {
  const { user } = useAuthListener();
  
  return (
    <UserContext.Provider value = {{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={ <Login/> }></Route>
            <Route path={ROUTES.SIGN_UP} element={ <SignUp/> }></Route>
            <Route path={ROUTES.DASHBOARD} element={ <Dashboard/> }></Route>
            <Route path="*" element={ <NotFound/> }></Route>
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
