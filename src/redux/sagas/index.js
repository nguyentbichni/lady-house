import { fork } from 'redux-saga/effects';

import authSaga from './auth.saga';
import productSaga from './product.saga';
import categorySaga from './category.saga';
import commentSaga from './comment.saga';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(commentSaga);
}
