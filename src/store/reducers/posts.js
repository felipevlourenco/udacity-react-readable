import {
  ADD_POST,
  EDIT_POST,
  SELECT_POST,
  DELETE_POST,
  CLEAN_POSTS,
  VOTE_POST,
  ORDER_VOTE_POST
} from './../actions/actionTypes'

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
    case CLEAN_POSTS:
      return {
        ...state,
        posts: []
      }
    case VOTE_POST:
      const votedPosts = state.posts.map(post => {
        if (post.id === action.id) {
          if (action.payload === 'upVote') {
            post.voteScore++
          } else if (action.payload === 'downVote') {
            post.voteScore--
          }
        }
        return post
      })
      return {
        ...state,
        posts: votedPosts
      }
    case ORDER_VOTE_POST:
      let copy = null
      if (action.payload === 'downVote') {
        copy = state.posts.sort((a, b) => {
          if (a.voteScore < b.voteScore) return -1
          if (a.voteScore > b.voteScore) return 1
          return 0
        })
      } else if (action.payload === 'upVote') {
        copy = state.posts.sort((a, b) => {
          if (a.voteScore > b.voteScore) return -1
          if (a.voteScore < b.voteScore) return 1
          return 0
        })
      } else if (action.payload === 'downTime') {
        copy = state.posts.sort((a, b) => {
          if (a.timestamp < b.timestamp) return -1
          if (a.timestamp > b.timestamp) return 1
          return 0
        })
      } else if (action.payload === 'upTime') {
        copy = state.posts.sort((a, b) => {
          if (a.timestamp > b.timestamp) return -1
          if (a.timestamp < b.timestamp) return 1
          return 0
        })
      }
      return {
        ...state,
        posts: copy
      }
    default:
      return state
  }
}

export default postsReducer
