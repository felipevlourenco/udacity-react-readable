import {
  ADD_COMMENT,
  EDIT_COMMENT,
  CLEAN_COMMENTS,
  DELETE_COMMENT,
  SELECT_COMMENT
} from './../actions/actionTypes'

const initialState = {
  comments: [],
  selectedComment: {}
}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.payload)
      }
    case EDIT_COMMENT:
      const editedComments = state.comments.map(comment => {
        return comment.id === action.id ? action.payload : comment
      })
      return {
        ...state,
        comments: editedComments
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
    case SELECT_COMMENT:
      return {
        ...state,
        selectedComment: action.payload
      }
    default:
      return state
  }
}

export default commentsReducer
