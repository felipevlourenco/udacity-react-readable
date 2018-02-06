import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'

import { connect } from 'react-redux'
import { editPost } from './../store/actions/posts'
import { addComment, cleanComments, deleteComment } from '../store/actions/comments'

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
    addComment: comment => dispatch(addComment(comment)),
    cleanComments: () => dispatch(cleanComments()),
    deleteComment: id => dispatch(deleteComment(id))
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

  deleteComment = id => {
    readableAPI.deleteComment(id).then(result => {
      this.props.deleteComment(id)
    })
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
    // console.log('====================================')
    // console.log(this.props.posts.selectedPost)
    // console.log('====================================')
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
          <h2>Comments:</h2>
        </div>
        {this.props.comments.comments.map(comment => (
          <div key={comment.id}>
            {!comment.deleted && (
              <div className="post">
                <div className="post-header">
                  <div className="post-header-title">
                    <div>{comment.body}</div>
                    <div>
                      <span onClick={() => this.deleteComment(comment.id)}>X</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
