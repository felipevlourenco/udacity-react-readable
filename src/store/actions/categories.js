import { ADD_CATEGORY, SELECT_CATEGORY } from './actionTypes'

export const addCategory = category => ({
  type: ADD_CATEGORY,
  payload: category
})

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  payload: category
})
