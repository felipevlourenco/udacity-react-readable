import { ADD_POST, EDIT_POST, SELECT_POST, DELETE_POST } from './actionTypes'

export const selectPost = post => ({
  type: SELECT_POST,
  payload: post
})

export const addPost = post => ({
  type: ADD_POST,
  payload: post
})

export const editPost = post => ({
  type: EDIT_POST,
  id: post.id,
  payload: post
})

export const deletePost = id => ({
  type: DELETE_POST,
  payload: id
})
