import { ADD_COMMENT, CLEAN_COMMENTS, DELETE_COMMENT } from './actionTypes'

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
})

export const cleanComments = () => ({
  type: CLEAN_COMMENTS
})

export const deleteComment = id => ({
  type: DELETE_COMMENT,
  payload: id
})
