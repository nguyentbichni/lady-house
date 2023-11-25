import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import authReducer from './redux/reducers/auth.reducer'
import productReducer from './redux/reducers/product.reducer'
import categoryReducer from './redux/reducers/category.reducer'
import reviewReducer from './redux/reducers/review.reducer'
import favoriteReducer from './redux/reducers/favorite.reducer'
import userReducer from './redux/reducers/user.reducer'
import cartReducer from './redux/reducers/cart.reducer'
import discountReducer from './redux/reducers/discount.reducer'
import locationReducer from './redux/reducers/location.reducer'
import orderReducer from './redux/reducers/order.reducer'

import rootSaga from './redux/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    review: reviewReducer,
    favorite: favoriteReducer,
    user: userReducer,
    cart: cartReducer,
    discount: discountReducer,
    location: locationReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
})

sagaMiddleware.run(rootSaga)

export default store
