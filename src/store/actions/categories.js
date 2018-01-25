import { ADD_CATEGORY } from './actionTypes'

export const addCategory = category => ({
  type: ADD_CATEGORY,
  payload: category
})

// export const updateCart = cart => ({
//   type: UPDATE_CART,
//   _id: cart._id,
//   payload: cart
// })
