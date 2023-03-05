import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo.loading) return <p>Loading...</p>;
  if (userInfo.data.role !== 'admin') return <p>Not found</p>;
  return (
    <>
      <Header />
      <Outlet />
      <div>Footer</div>
    </>
  );
};

export default AdminLayout;
