import {
  FETCH_COMPLETE,
  FETCH_ERROR,
  FETCH_LOADING
} from '../actions/types'

const DEFAULT_STATE = {
  loading: false
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_COMPLETE:
      return {
        ...state,
        loading: false
      }

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case FETCH_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  }
}
