import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './redux/reducers/auth.reducer';
import productReducer from './redux/reducers/product.reducer';
import categoryReducer from './redux/reducers/category.reducer';
import commentReducer from './redux/reducers/comment.reducer';

import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
