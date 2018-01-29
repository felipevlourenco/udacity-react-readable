import { ADD_COMMENT } from './actionTypes'

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
})
