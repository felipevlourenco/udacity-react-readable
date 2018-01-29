import { ADD_COMMENT } from './../actions/actionTypes'

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
    default:
      return state
  }
}

export default commentsReducer
