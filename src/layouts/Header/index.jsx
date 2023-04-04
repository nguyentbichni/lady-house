import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { ROUTER } from '../../constants/routers';
import { logoutAction } from '../../redux/actions';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickMenuItem = (key) => {
    switch (key) {
      case 'profile':
        return navigate(ROUTER.USER.HOME);
      case 'logout':
        return handleLogout();
      default:
        return null;
    }
  };

  const handleLogout = () => {
    if (userInfo.data.role === 'admin') {
      navigate(ROUTER.LOGIN);
    }
    dispatch(logoutAction());
  };
  // const cartQuantity = JSON.parse(localStorage.getItem('cart')).length;
  return (
    <div>
      <div>Header</div>
      <div>
        <Badge count={cartList.length}>
          <ShoppingCartOutlined onClick={() => navigate(ROUTER.USER.CART)} style={{ fontSize: 24 }} />
        </Badge>
      </div>
      <div>
        {userInfo.data.id ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'profile',
                  label: 'My Profile',
                },
                {
                  key: 'logout',
                  label: 'Logout',
                },
              ],
              onClick: (e) => handleClickMenuItem(e.key),
            }}
          >
            <p>{userInfo.data.name}</p>
          </Dropdown>
        ) : (
          <Button onClick={() => navigate(ROUTER.LOGIN)}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
