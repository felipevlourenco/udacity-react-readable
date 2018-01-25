import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'

import { connect } from 'react-redux'
import { addCategory } from './../store/actions/categories'

const mapStateToProps = state => {
  return state.categories
}

const mapDispatchToProps = dispatch => {
  return {
    addCategory: category => dispatch(addCategory(category))
  }
}

class Root extends Component {
  state = {
    categories: [],
    posts: []
  }
  componentDidMount() {
    readableAPI.getCategories().then(categories => {
      // this.setState({ categories: categories })
      categories.forEach(category => this.props.addCategory(category))
    })
    readableAPI.getPosts().then(posts => {
      this.setState({ posts: posts })
    })
  }

  render() {
    return (
      <div className="root">
        <div>test root</div>
      </div>
    )
  }
}

const RootConnected = connect(mapStateToProps, mapDispatchToProps)(Root)
export default RootConnected
