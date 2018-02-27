import {
  ADD_COMMENT,
  EDIT_COMMENT,
  CLEAN_COMMENTS,
  DELETE_COMMENT,
  SELECT_COMMENT
} from './actionTypes'

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
})

export const editComment = comment => ({
  type: EDIT_COMMENT,
  id: comment.id,
  payload: comment
})

export const cleanComments = () => ({
  type: CLEAN_COMMENTS
})

export const deleteComment = id => ({
  type: DELETE_COMMENT,
  payload: id
})

export const selectComment = id => ({
  type: SELECT_COMMENT,
  payload: id
})
