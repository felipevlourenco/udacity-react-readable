import { ADD_POST } from './../actions/actionTypes'

const initialState = {
  posts: []
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload)
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

export default postsReducer
