import { ADD_POST, EDIT_POST, SELECT_POST, DELETE_POST } from './../actions/actionTypes'

const initialState = {
  posts: [],
  selectedPost: {}
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload)
      }
    case EDIT_POST:
      const updatedPost = state.posts.map(post => {
        return post.id === action.id ? action.payload : post
      })
      return {
        ...state,
        posts: updatedPost
      }
    case DELETE_POST:
      const newPosts = state.posts.map(post => {
        if (post.id === action.payload) {
          post.deleted = true
        }
        return post
      })
      return {
        ...state,
        posts: newPosts
      }
    default:
      return state
  }
}

export default postsReducer
