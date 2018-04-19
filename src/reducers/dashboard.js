import {
  UPDATE_ANSWER,
  GET_QUESTIONS
} from '../actions/types'

const DEFAULT_STATE = {
  answer: null,
  byId: [],
  byHash: {}
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_ANSWER:
      return {
        ...state,
        answer: action.payload
      }

    case GET_QUESTIONS:
      return {
        ...state,
        byId: state.byId.includes(action.payload.id)
          ? [ ...state.byId ]
          : [ ...state.byId, action.payload.id ],
        byHash: {
          ...state.byHash,
          [action.payload.id]: action.payload
        }
      }

    default:
      return state
  }
}
