import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS, FAIL, FAVORITE_ACTION, PRODUCT_ACTION } from '../constants';

function* favoriteProductSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`http://localhost:4000/favorites`, data);
    yield put({
      type: SUCCESS(FAVORITE_ACTION.FAVORITE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
    // yield put({
    //   type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    //   payload: {
    //     id: data.productId,
    //   },
    // });
  } catch (errors) {
    yield put({
      type: FAIL(FAVORITE_ACTION.FAVORITE_PRODUCT),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}
function* unfavoriteProductSaga(action) {
  try {
    const { id, productId } = action.payload;
    yield axios.delete(`http://localhost:4000/favorites/${id}`);
    yield put({
      type: SUCCESS(FAVORITE_ACTION.UNFAVORITE_PRODUCT),
      payload: {
        id,
      },
    });
    // yield put({
    //   type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    //   payload: {
    //     id: productId,
    //   },
    // });
  } catch (errors) {
    yield put({
      type: FAIL(FAVORITE_ACTION.UNFAVORITE_PRODUCT),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}
function* getFavoriteListSaga(action) {}
export default function* favoriteSaga() {
  yield takeEvery(REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST), getFavoriteListSaga);
  yield takeEvery(REQUEST(FAVORITE_ACTION.FAVORITE_PRODUCT), favoriteProductSaga);
  yield takeEvery(REQUEST(FAVORITE_ACTION.UNFAVORITE_PRODUCT), unfavoriteProductSaga);
}
