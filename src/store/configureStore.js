import { createStore, combineReducers } from 'redux'
import categoriesReducer from './reducers/categories'
import postsReducer from './reducers/posts'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer
})

const configureStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

export default configureStore
