import { createReducer } from '@reduxjs/toolkit'
import { PRODUCT_ACTION, FAVORITE_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
  createProductData: {
    loading: false,
    error: null,
  },
  updateProductData: {
    loading: false,
    error: null,
  },
}
const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, isShowMore } = action.payload
    return {
      ...state,
      productList: {
        data: isShowMore ? [...state.productList.data, ...data] : data,
        meta,
        loading: true,
        error: null,
      },
    }
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        errors,
      },
    }
  },

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        loading: true,
        error: null,
      },
    }
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        errors,
      },
    }
  },

  [REQUEST(PRODUCT_ACTION.CREATE_PRODUCT)]: (state) => {
    return {
      ...state,
      createProductData: {
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      createProductData: {
        ...state.createProductData,
        loading: false,
      },
    }
  },
  [FAIL(PRODUCT_ACTION.CREATE_PRODUCT)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      createProductData: {
        loading: false,
        errors,
      },
    }
  },
  // UPDATE_PRODUCT
  [REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT)]: (state) => {
    return {
      ...state,
      updateProductData: {
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      updateProductData: {
        ...state.updateProductData,
        loading: false,
      },
    }
  },
  [FAIL(PRODUCT_ACTION.UPDATE_PRODUCT)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      updateProductData: {
        loading: false,
        errors,
      },
    }
  },
  // FAVORITE_PRODUCT
  [SUCCESS(FAVORITE_ACTION.FAVORITE_PRODUCT)]: (state, action) => {
    const { data } = action.payload
    // const newFavorites = [...state.productDetail.data.favorites];
    // newFavorites.push(data);
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: {
          ...state.productDetail.data,
          // favorites: newFavorites,
          favorites: [...state.productDetail.data.favorites, data],
        },
      },
    }
  },
  // UNFAVORITE_PRODUCT
  [SUCCESS(FAVORITE_ACTION.UNFAVORITE_PRODUCT)]: (state, action) => {
    const { id } = action.payload
    console.log('🚀 ~ file: product.reducer.js:171 ~ [SUCCESS ~ id', id)
    const newFavorites = state.productDetail.data.favorites?.filter((item) => item.id !== id)
    console.log('🚀 ~ file: product.reducer.js:172 ~ [SUCCESS ~ newFavorites', newFavorites)
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: {
          ...state.productDetail.data,
          favorites: newFavorites,
        },
      },
    }
  },
})

export default productReducer
