// import { createStore } from 'redux'
// import cartsReducer from './reducers/carts'

// const store = createStore(cartsReducer)

// export default store

import { createStore, combineReducers } from 'redux'
import categoriesReducer from './reducers/categories'

const rootReducer = combineReducers({
  categories: categoriesReducer
})

const configureStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

export default configureStore
