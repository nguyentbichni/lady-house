import { createAction } from '@reduxjs/toolkit';
import { REQUEST, FAVORITE_ACTION } from '../constants';

export const getFavoriteListAction = createAction(REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST));
export const favoriteProductAction = createAction(REQUEST(FAVORITE_ACTION.FAVORITE_PRODUCT));
export const unfavoriteProductAction = createAction(REQUEST(FAVORITE_ACTION.UNFAVORITE_PRODUCT));
