import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './redux/reducers/auth.reducer';
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;