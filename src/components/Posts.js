import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'

import { connect } from 'react-redux'
import { editPost } from './../store/actions/posts'
import { addComment } from '../store/actions/comments'

import Moment from 'react-moment'
import MdCompareArrows from 'react-icons/lib/md/compare-arrows'
import { Button } from 'react-bootstrap'

import CommentsModal from './CommentsModal'

import './Root.css'

const mapStateToProps = state => {
  return { categories: state.categories, posts: state.posts, comments: state.comments }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch(editPost(post)),
    addComment: comment => dispatch(addComment(comment))
  }
}

class Posts extends Component {
  state = {
    isCommentModalOpen: false,
    title: '',
    body: '',
    author: '',
    category: ''
  }

  openModal = () => {
    this.setState({ isCommentModalOpen: true })
  }

  closeModal = () => {
    this.setState({
      isCommentModalOpen: false
    })
  }

  componentDidMount() {
    // this.setState({
    //   title: this.props.posts.selectedPost.title,
    //   body: this.props.posts.selectedPost.body,
    //   author: this.props.posts.selectedPost.author,
    //   category: this.props.posts.selectedPost.category
    // })
    console.log('====================================')
    console.log(this.props.posts.selectedPost)
    console.log('====================================')
    readableAPI.getCommentsFromPost(this.props.posts.selectedPost.id).then(comments => {
      comments.forEach(comment => this.props.addComment(comment))
    })
  }

  render() {
    const { selectedPost } = this.props.posts

    return (
      <div className="posts">
        {/* <div>{this.props.posts.selectedPost.title}</div> */}
        <div className="post">
          <div className="post-header">
            <div className="row">
              <div className="col-md-9 post-header-title">{selectedPost.title}</div>
              <div className="col-md-3 post-header-title">{selectedPost.author}</div>
            </div>
          </div>
          <div className="post-body">
            <div className="row">
              <div className="col-md-12">{selectedPost.body}</div>
            </div>
          </div>
          <div className="post-footer">
            <div className="row">
              <div className="col-md-8">
                <Moment format="DD/MM/YYYY HH:mm">{selectedPost.timestamp}</Moment>
              </div>
              <div className="col-md-2">
                <MdCompareArrows /> {selectedPost.voteScore}
              </div>
            </div>
          </div>
        </div>
        <div className="comments-section">
          <h2>Comments:</h2>
        </div>
        {this.props.comments.comments.map(comment => (
          <div className="post" key={comment.id}>
            <div className="post-header">
              <div className="post-header-title">{comment.body}</div>
            </div>
          </div>
        ))}
        <Button bsStyle="primary" onClick={() => this.openModal()}>
          Add comment
        </Button>
        {this.state.isCommentModalOpen && (
          <CommentsModal closeModalAction={this.closeModal} postId={selectedPost.id} />
        )}
      </div>
    )
  }
}

const PostsConnected = connect(mapStateToProps, mapDispatchToProps)(Posts)
export default PostsConnected
