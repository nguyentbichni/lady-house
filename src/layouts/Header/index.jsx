import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <div>Header - {userInfo.data.name}</div>;
};

export default Header;
