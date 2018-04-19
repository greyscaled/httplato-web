import axios from 'axios'
import {
  GET_QUESTIONS,
  FETCH_COMPLETE,
  FETCH_ERROR,
  UPDATE_ANSWER
} from './types'

const BASE_URL = 'https://httplato-api.herokuapp.com'

export const getAnswer = (id) => async dispatch => {
  if (!id) {
    return dispatch({ type: UPDATE_ANSWER, payload: null })
  }
  const res = await axios.post(`${BASE_URL}/questions/question/${id}`)
    .catch((err) => {
      console.log(err)
    })
  if (res && (res.status === 200)) {
    dispatch({ type: UPDATE_ANSWER, payload: res.data })
  }
}

export const getQuestions = () => async dispatch => {
  const res = await axios.get(`${BASE_URL}/questions`)
    .catch((err) => {
      dispatch({ type: FETCH_ERROR, payload: err })
    })
  if (res && (res.status === 200)) {
    res.data.forEach(question => {
      dispatch({ type: GET_QUESTIONS, payload: question })
    })
    dispatch({ type: FETCH_COMPLETE })
  }
}
