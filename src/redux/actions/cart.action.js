import { createAction } from '@reduxjs/toolkit';
import { REQUEST, CART_ACTION } from '../constants';

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
