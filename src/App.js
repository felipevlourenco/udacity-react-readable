import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Root from './components/Root'
import Categories from './components/Categories'
import Posts from './components/Posts'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link Right
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
