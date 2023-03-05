import { createAction } from '@reduxjs/toolkit';
import { REQUEST, REVIEW_ACTION } from '../constants';

export const getReviewListAction = createAction(REQUEST(REVIEW_ACTION.GET_REVIEW_LIST));
export const createReviewAction = createAction(REQUEST(REVIEW_ACTION.CREATE_REVIEW));
export const deleteReviewAction = createAction(REQUEST(REVIEW_ACTION.DELETE_REVIEW));
