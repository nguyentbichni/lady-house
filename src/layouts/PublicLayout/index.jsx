import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </>
  );
};

export default PublicLayout;
