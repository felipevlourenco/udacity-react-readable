import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'
import {
  Modal,
  Button,
  Col,
  Row,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'

import { connect } from 'react-redux'
import { editPost } from './../store/actions/posts'

const mapStateToProps = state => {
  return { categories: state.categories, posts: state.posts }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch(editPost(post))
  }
}

class Posts extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  }

  componentDidMount() {
    // this.setState({
    //   title: this.props.posts.selectedPost.title,
    //   body: this.props.posts.selectedPost.body,
    //   author: this.props.posts.selectedPost.author,
    //   category: this.props.posts.selectedPost.category
    // })
    console.log('====================================')
    console.log(this.props)
    console.log('====================================')
  }

  render() {
    return (
      <div className="posts">
        <div>test Posts</div>
      </div>
    )
  }
}

const PostsConnected = connect(mapStateToProps, mapDispatchToProps)(Posts)
export default PostsConnected
