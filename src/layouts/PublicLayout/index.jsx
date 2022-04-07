import { Outlet } from 'react-router-dom';
import Header from '../Header';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div>Footer</div>
    </>
  );
};

export default PublicLayout;
