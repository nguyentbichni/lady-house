import { createReducer } from '@reduxjs/toolkit';
import { CART_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  cartList: JSON.parse(localStorage.getItem('cart')) || [],
};
const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { data } = action.payload;
    const newCartList = [...state.cartList];
    const existCartIndex = state.cartList.findIndex((item) => item.id === data.id);
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
});
export default cartReducer;
