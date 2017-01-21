import * as types from '../actions/actionTypes'

export default function isLoading (state = [], action) {
  switch (action.type) {
    case types.SET_LOADING_MASK:
      return action.isLoading
    case types.REMOVE_LOADING_MASK:
      return action.isLoading
    default: {
      return state
    }
  }
}
