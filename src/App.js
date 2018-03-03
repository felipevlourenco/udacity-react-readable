import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as readableAPI from './utils/readableAPIUtils'

import Root from './components/Root'
import Categories from './components/Categories'
import Posts from './components/Posts'

import { Navbar, Nav, NavItem } from 'react-bootstrap'

class App extends Component {
  state = {
    categories: []
  }
  componentDidMount() {
    readableAPI.getCategories().then(categories => {
      // this.setState({ categories: categories })
      // categories.forEach(category => this.props.addCategory(category))
      this.setState({ categories: categories })
    })
  }
  render() {
    return (
      <div className="App">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Udacity - Readable</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar>
            <Nav>
              <NavItem eventKey={1} href="/">
                Root
              </NavItem>
              {this.state.categories.map(category => (
                <Link key={category.name} to={`/${category.name}`}>
                  {category.name}
                  {/* <Link to={`/categories/${category.name}`}>{category.name}</Link> */}
                </Link>
              ))}
              {/*  <NavItem eventKey={2} href="/categories">
                Categories
              </NavItem> */}
            </Nav>
          </Navbar>
        </Navbar>
        <Route exact path="/" render={({ history }) => <Root history={history} />} />
        {/* <Route path="/categories" render={({ history }) => <Categories history={history} />} /> */}
        {this.state.categories.map(category => (
          <Route
            exact
            key={category.name}
            path={`/${category.name}`}
            render={({ history }) => <Categories history={history} category={category.name} />}
          />
        ))}
        <Route path="/:category/:id" render={({ history }) => <Posts history={history} />} />
        <Route path="/posts" render={({ history }) => <Posts history={history} />} />
      </div>
    )
  }
}

export default App
