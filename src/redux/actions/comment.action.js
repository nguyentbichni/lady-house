import { createAction } from '@reduxjs/toolkit';
import { REQUEST, COMMENT_ACTION } from '../constants';

export const getCommentListAction = createAction(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST));
export const createCommentAction = createAction(REQUEST(COMMENT_ACTION.CREATE_COMMENT));
export const deleteCommentAction = createAction(REQUEST(COMMENT_ACTION.DELETE_COMMENT));
