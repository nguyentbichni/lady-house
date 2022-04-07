import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <>
      <Outlet />
      <div>Footer</div>
    </>
  );
};

export default LoginLayout;
