import { createAction } from '@reduxjs/toolkit';
import { REQUEST, USER_ACTION } from '../constants';

export const getUserListAction = createAction(REQUEST(USER_ACTION.GET_USER_LIST));
export const updateUserAction = createAction(REQUEST(USER_ACTION.UPDATE_USER));
export const deleteUserAction = createAction(REQUEST(USER_ACTION.DELETE_USER));
