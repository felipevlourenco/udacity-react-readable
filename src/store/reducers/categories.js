import { ADD_CATEGORY, SELECT_CATEGORY } from './../actions/actionTypes'

const initialState = {
  categories: [],
  selectedCategory: ''
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.payload)
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      }
    default:
      return state
  }
}

export default categoriesReducer
