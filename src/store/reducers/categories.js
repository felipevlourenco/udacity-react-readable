import { ADD_CATEGORY } from './../actions/actionTypes'

const initialState = {
  categories: []
}

const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.payload)
      }
    // case UPDATE_CART:
    //   const updatedCarts = state.carts.map(cart => {
    //     return cart._id === action._id ? action.payload : cart
    //   })
    //   return {
    //     ...state,
    //     carts: updatedCarts
    //   }
    default:
      return state
  }
}

export default cartsReducer
