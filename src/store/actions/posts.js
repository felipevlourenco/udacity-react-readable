import {
  ADD_POST,
  EDIT_POST,
  SELECT_POST,
  DELETE_POST,
  CLEAN_POSTS,
  VOTE_POST,
  ORDER_VOTE_POST
} from './actionTypes'

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

export const clearPosts = () => ({
  type: CLEAN_POSTS
})

export const votePost = (id, vote) => ({
  type: VOTE_POST,
  id: id,
  payload: vote
})

export const orderVotePost = type => ({
  type: ORDER_VOTE_POST,
  payload: type
})
