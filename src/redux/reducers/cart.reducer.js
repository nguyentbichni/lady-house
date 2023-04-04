import { createReducer } from '@reduxjs/toolkit';
import { CART_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  cartList: JSON.parse(localStorage.getItem('cart')) || [],
};
const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { data } = action.payload;
    const newCartList = [...state.cartList];
    const existCartIndex = state.cartList.findIndex(
      (item) => item.id === data.id && (data.option ? item.option?.id === data.option.id : true)
    );
    if (existCartIndex !== -1) {
      const cartData = {
        ...state.cartList[existCartIndex],
        quantity: data.quantity + state.cartList[existCartIndex].quantity,
      };
      newCartList.splice(existCartIndex, 1, cartData);
    } else {
      newCartList.push(data);
    }
    localStorage.setItem('cart', JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
  [REQUEST(CART_ACTION.UPDATE_CART)]: (state, action) => {
    const { id, quantity, option } = action.payload;
    const newCartList = [...state.cartList];
    const existCartIndex = state.cartList.findIndex(
      (item) => item.id === id && (option ? item.option?.id === option.id : true)
    );
    newCartList.splice(existCartIndex, 1, {
      ...state.cartList[existCartIndex],
      quantity,
    });
    localStorage.setItem('cart', JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
  [REQUEST(CART_ACTION.DELETE_CART)]: (state, action) => {
    const { id, option } = action.payload;
    const newCartList = [...state.cartList];
    const existCartIndex = state.cartList.findIndex(
      (item) => item.id === id && (option ? item.option?.id === option.id : true)
    );
    newCartList.splice(existCartIndex, 1);
    // const newCartList = state.cartList.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },
});
export default cartReducer;
