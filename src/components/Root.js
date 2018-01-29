import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'

import { connect } from 'react-redux'
import { addCategory } from './../store/actions/categories'
import { addPost } from './../store/actions/posts'
import { selectPost } from '../store/actions/posts'

import Moment from 'react-moment'

import PostModal from './PostModal'
import CommentsModal from './CommentsModal'
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
    addPost: post => dispatch(addPost(post)),
    selectPost: post => dispatch(selectPost(post))
  }
}

class Root extends Component {
  state = {
    isPostModalOpen: false,
    isCommentModalOpen: false,
    postId: ''
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

  openModal = (type, id) => {
    if (id) {
      this.setState({ postId: id })
    }

    if (type === 'post') {
      this.setState({ isPostModalOpen: true })
    } else if (type === 'comment') {
      this.setState({ isCommentModalOpen: true })
    }
  }

  closeModal = () => {
    this.setState({
      isPostModalOpen: false,
      isCommentModalOpen: false,
      postId: ''
    })
  }

  selectPost = post => {
    this.props.selectPost(post)
    this.props.history.push('/posts')
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
          {this.props.posts.posts.map(post => (
            <div key={post.id} className="row">
              <div className="col-md-3" />
              <div className="col-md-6">
                <div className="post">
                  {/* <div className="post-header" onClick={() => this.openModal('post', post.id)}> */}
                  <div className="post-header" onClick={() => this.selectPost(post)}>
                    <div className="row">
                      <div className="col-md-9 post-header-title">{post.title}</div>
                      <div className="col-md-3 post-header-title">{post.author}</div>
                    </div>
                  </div>
                  <div className="post-body">
                    <div className="row">
                      <div className="col-md-12">{post.body}</div>
                    </div>
                  </div>
                  <div className="post-footer">
                    <div className="row">
                      <div className="col-md-8">
                        <Moment format="DD/MM/YYYY HH:mm">{post.timestamp}</Moment>
                      </div>
                      <div className="col-md-2" onClick={() => this.openModal('comment', post.id)}>
                        <MdComment /> {post.commentCount}
                      </div>
                      <div className="col-md-2">
                        <MdCompareArrows /> {post.voteScore}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3" />
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-md-12">
            <Button bsStyle="primary" onClick={() => this.openModal('post')}>
              Add post
            </Button>
          </div>
        </div>
        {this.state.isPostModalOpen && (
          <PostModal closeModalAction={this.closeModal} postId={this.state.postId} />
        )}
        {this.state.isCommentModalOpen && (
          <CommentsModal closeModalAction={this.closeModal} postId={this.state.postId} />
        )}
      </div>
    )
  }
}

const RootConnected = connect(mapStateToProps, mapDispatchToProps)(Root)
export default RootConnected
