import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Root from './components/Root'
import Categories from './components/Categories'
import Posts from './components/Posts'

import { Navbar, Nav, NavItem } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="">Udacity - Readable</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">
                Root
              </NavItem>
              <NavItem eventKey={2} href="/categories">
                Categories
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" render={({ history }) => <Root history={history} />} />
        <Route path="/categories" render={({ history }) => <Categories history={history} />} />
        <Route path="/posts" render={({ history }) => <Posts history={history} />} />
      </div>
    )
  }
}

export default App
