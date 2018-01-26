import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'

import { connect } from 'react-redux'
import { addCategory } from './../store/actions/categories'
import { addPost } from './../store/actions/posts'

import uuid from 'uuid/v4'

import { Button } from 'react-bootstrap'

import MdComment from 'react-icons/lib/md/comment'
import MdCompareArrows from 'react-icons/lib/md/compare-arrows'
import './Root.css'

const mapStateToProps = state => {
  return { categories: state.categories, posts: state.posts }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategory: category => dispatch(addCategory(category)),
    addPost: post => dispatch(addPost(post))
  }
}

class Root extends Component {
  state = {
    // categories: [],
    // posts: []
  }
  componentDidMount() {
    readableAPI.getCategories().then(categories => {
      // this.setState({ categories: categories })
      categories.forEach(category => this.props.addCategory(category))
    })
    readableAPI.getPosts().then(posts => {
      // this.setState({ posts: posts })
      posts.forEach(post => this.props.addPost(post))
    })
  }

  addPost = () => {
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: 'values.title',
      body: 'values.body',
      author: 'values.author',
      category: 'react'
    }

    readableAPI.addPost(post).then(post => {
      // dispatch({ type: ADD, post })
      // toastr.success('Success', 'Post posted successfully.')
      console.log(post)
    })
  }

  render() {
    return (
      <div className="root">
        <div className="categories">
          <h2>Categories</h2>
          {this.props.categories.categories.map(category => (
            <div key={category.name}>{category.name}</div>
          ))}
        </div>
        <div className="posts">
          <h2>Posts</h2>
          <div className="row">
            {this.props.posts.posts.map(post => (
              <div key={post.id} className="col-md-6">
                <div className="post">
                  <div className="post-header">
                    <div className="row">
                      <div className="col-md-9">{post.title}</div>
                      <div className="col-md-3">{post.author}</div>
                    </div>
                  </div>
                  <div className="post-body">
                    <div className="row">
                      <div className="col-md-12">{post.body}</div>
                    </div>
                  </div>
                  <div className="post-footer">
                    <div className="row">
                      <div className="col-md-8">{post.category}</div>
                      <div className="col-md-2">
                        <MdComment />
                        {post.commentCount}
                      </div>
                      <div className="col-md-2">
                        <MdCompareArrows />
                        {post.voteScore}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Button bsStyle="primary" onClick={this.addPost}>
              Add post
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const RootConnected = connect(mapStateToProps, mapDispatchToProps)(Root)
export default RootConnected
