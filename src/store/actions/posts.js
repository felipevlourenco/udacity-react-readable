import { ADD_POST, EDIT_POST } from './actionTypes'

export const addPost = post => ({
  type: ADD_POST,
  payload: post
})

export const editPost = post => ({
  type: EDIT_POST,
  id: post.id,
  payload: post
})
