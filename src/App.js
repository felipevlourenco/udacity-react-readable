import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Root from './components/Root'
import Categories from './components/Categories'
import Posts from './components/Posts'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={({ history }) => <Root history={history} />} />
        <Route path="/categories" render={({ history }) => <Categories history={history} />} />
        <Route path="/posts" render={({ history }) => <Posts history={history} />} />
      </div>
    )
  }
}

export default App
