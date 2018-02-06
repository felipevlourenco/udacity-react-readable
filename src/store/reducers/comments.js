import { ADD_COMMENT, CLEAN_COMMENTS, DELETE_COMMENT } from './../actions/actionTypes'

const initialState = {
  comments: []
}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.payload)
      }
    case CLEAN_COMMENTS:
      return {
        ...state,
        comments: []
      }
    case DELETE_COMMENT:
      const updatedComments = state.comments.map(comment => {
        if (comment.id === action.payload) {
          comment.deleted = true
        }
        return comment
      })
      return {
        ...state,
        comments: updatedComments
      }
    default:
      return state
  }
}

export default commentsReducer
