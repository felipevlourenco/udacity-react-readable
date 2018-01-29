import { ADD_POST, EDIT_POST, SELECT_POST } from './../actions/actionTypes'

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
    default:
      return state
  }
}

export default postsReducer
