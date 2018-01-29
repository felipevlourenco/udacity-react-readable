import { createStore, combineReducers } from 'redux'
import categoriesReducer from './reducers/categories'
import postsReducer from './reducers/posts'
import commentsReducer from './reducers/comments'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer
})

const configureStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

export default configureStore
