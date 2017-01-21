import * as types from './actionTypes'

export function setLoadingMask () {
  return {type: types.SET_LOADING_MASK, isLoading: true}
}

export function removeLoadingMask () {
  return {type: types.REMOVE_LOADING_MASK, isLoading: false}
}
