import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './App.css';
import { ROUTER } from './constants/routers';
import PublicLayout from './layouts/PublicLayout';
import LoginLayout from './layouts/LoginLayout';

import { getUserInfoAction } from './redux/actions';
import P from './pages';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedUserData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTER.USER.HOME} element={<P.HomePage />} />
        <Route path={ROUTER.USER.PRODUCT_LIST} element={<P.ProductListPage />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path={ROUTER.LOGIN} element={<P.LoginPage />} />
        <Route path={ROUTER.REGISTER} element={<P.RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
