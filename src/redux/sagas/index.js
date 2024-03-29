import { fork } from 'redux-saga/effects'

import authSaga from './auth.saga'
import productSaga from './product.saga'
import categorySaga from './category.saga'
import reviewSaga from './review.saga'
import favoriteSaga from './favorite.saga'
import userSaga from './user.saga'
import discountSaga from './discount.saga'
import locationSaga from './location.saga'
import orderSaga from './order.saga'

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(productSaga)
  yield fork(categorySaga)
  yield fork(reviewSaga)
  yield fork(favoriteSaga)
  yield fork(userSaga)
  yield fork(discountSaga)
  yield fork(locationSaga)
  yield fork(orderSaga)
}
