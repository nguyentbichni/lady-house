import { createAction } from '@reduxjs/toolkit';
import { REQUEST, DISCOUNT_ACTION } from '../constants';

export const getDiscountListAction = createAction(REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST));
export const createDiscountAction = createAction(REQUEST(DISCOUNT_ACTION.CREATE_DISCOUNT));
export const updateDiscountAction = createAction(REQUEST(DISCOUNT_ACTION.UPDATE_DISCOUNT));
export const deleteDiscountAction = createAction(REQUEST(DISCOUNT_ACTION.DELETE_DISCOUNT));
