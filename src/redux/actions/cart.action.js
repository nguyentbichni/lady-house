import { createAction } from '@reduxjs/toolkit';
import { REQUEST, CART_ACTION } from '../constants';

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const updateCartAction = createAction(REQUEST(CART_ACTION.UPDATE_CART));
export const deleteCartAction = createAction(REQUEST(CART_ACTION.DELETE_CART));
