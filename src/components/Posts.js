import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'

import { connect } from 'react-redux'
import { editPost, votePost, deletePost } from './../store/actions/posts'
import { addComment, cleanComments, deleteComment, selectComment } from '../store/actions/comments'

import Moment from 'react-moment'
import MdCompareArrows from 'react-icons/lib/md/compare-arrows'
import { Button } from 'react-bootstrap'

import PostModal from './PostModal'
import CommentsModal from './CommentsModal'

import './Root.css'

const mapStateToProps = state => {
  return { categories: state.categories, posts: state.posts, comments: state.comments }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch(editPost(post)),
    deletePost: id => dispatch(deletePost(id)),
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    addComment: comment => dispatch(addComment(comment)),
    cleanComments: () => dispatch(cleanComments()),
    deleteComment: id => dispatch(deleteComment(id)),
    selectComment: id => dispatch(selectComment(id))
  }
}

class Posts extends Component {
  state = {
    isPostModalOpen: false,
    isCommentModalOpen: false,
    title: '',
    body: '',
    author: '',
    category: ''
  }

  deleteComment = id => {
    readableAPI.deleteComment(id).then(result => {
      this.props.deleteComment(id)
    })
  }

  openModal = (type, comment) => {
    if (type === 'edit') {
      this.setState({ isPostModalOpen: true })
    } else if (type === 'edit_comment') {
      this.props.selectComment(comment)
      this.setState({ isCommentModalOpen: true })
    } else {
      this.props.selectComment({})
      this.setState({ isCommentModalOpen: true })
    }
  }

  votePost = (id, vote) => {
    readableAPI.votePost(id, vote).then(post => {
      this.props.votePost(id, vote)
    })
  }
  deletePost = id => {
    readableAPI.deletePost(id).then(post => {
      this.props.deletePost(id)
      window.location.href = '/'
    })
  }

  closeModal = () => {
    this.setState({
      isPostModalOpen: false,
      isCommentModalOpen: false
    })
  }

  componentDidMount() {
    let path = this.props.history.location.pathname.split('/')
    let id = null
    if (path[1] !== 'posts') {
      id = path[2]
    }
    if (this.props.posts.selectedPost.id === undefined || id === null) {
      window.location.href = '/not-found'
    }

    readableAPI.getCommentsFromPost(this.props.posts.selectedPost.id).then(comments => {
      this.props.cleanComments()
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
          <h2>Comments ({this.props.comments.comments.length}):</h2>
        </div>
        {this.props.comments.comments.map(comment => (
          <div key={comment.id}>
            {!comment.deleted && (
              <div className="post">
                <div className="post-header">
                  <div className="post-header-title">
                    <div>{comment.body}</div>
                    <div>
                      <Button
                        bsStyle="primary"
                        className="paddinBtn"
                        onClick={() => this.deleteComment(comment.id)}
                      >
                        Delete Comment
                      </Button>
                      <Button
                        bsStyle="primary"
                        className="paddinBtn"
                        onClick={() => this.openModal('edit_comment', comment)}
                      >
                        Edit comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <Button
          bsStyle="primary"
          className="paddinBtn"
          onClick={() => (window.location.href = '/')}
        >
          Back
        </Button>
        <Button bsStyle="primary" className="paddinBtn" onClick={() => this.openModal('edit')}>
          Edit post
        </Button>
        <Button
          bsStyle="primary"
          className="paddinBtn"
          onClick={() => this.deletePost(selectedPost.id)}
        >
          Delete post
        </Button>
        <Button bsStyle="primary" className="paddinBtn" onClick={() => this.openModal()}>
          Add comment
        </Button>
        <Button
          bsStyle="primary"
          className="paddinBtn"
          onClick={() => this.votePost(selectedPost.id, 'upVote')}
        >
          Vote +
        </Button>
        <Button
          bsStyle="primary"
          className="paddinBtn"
          onClick={() => this.votePost(selectedPost.id, 'downVote')}
        >
          Vote -
        </Button>
        {this.state.isPostModalOpen && (
          <PostModal closeModalAction={this.closeModal} postId={selectedPost.id} />
        )}
        {this.state.isCommentModalOpen && (
          <CommentsModal closeModalAction={this.closeModal} postId={selectedPost.id} />
        )}
      </div>
    )
  }
}

const PostsConnected = connect(mapStateToProps, mapDispatchToProps)(Posts)
export default PostsConnected
