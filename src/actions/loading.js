import { FETCH_LOADING } from './types'

export const fetch = () => async dispatch => {
  dispatch({ type: FETCH_LOADING })
}
