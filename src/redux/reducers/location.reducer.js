import { createReducer } from '@reduxjs/toolkit'
import { LOCATION_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

const initialState = {
  cityList: {
    data: [],
    loading: false,
    error: null,
  },
  districtList: {
    data: [],
    loading: false,
    error: null,
  },
  wardList: {
    data: [],
    loading: false,
    error: null,
  },
}
const locationReducer = createReducer(initialState, {
  [REQUEST(LOCATION_ACTION.GET_CITY_LIST)]: (state) => {
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      cityList: {
        data,
        loading: true,
        error: null,
      },
    }
  },
  [FAIL(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: false,
        errors,
      },
    }
  },

  [REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state) => {
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      districtList: {
        data,
        loading: true,
        error: null,
      },
    }
  },
  [FAIL(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: false,
        errors,
      },
    }
  },

  [REQUEST(LOCATION_ACTION.GET_WARD_LIST)]: (state) => {
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      wardList: {
        data,
        loading: true,
        error: null,
      },
    }
  },
  [FAIL(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: false,
        errors,
      },
    }
  },
})
export default locationReducer
