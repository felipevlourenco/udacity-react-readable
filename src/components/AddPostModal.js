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
import { addPost, editPost } from './../store/actions/posts'
import uuid from 'uuid/v4'

const mapStateToProps = state => {
  return { categories: state.categories, posts: state.posts }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(addPost(post)),
    editPost: post => dispatch(editPost(post))
  }
}

class AddPostModal extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  }

  handleCloseModal = () => {
    this.props.closeModalAction()
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addPost = () => {
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }

    readableAPI.addPost(post).then(post => {
      this.props.addPost(post)
      this.handleCloseModal()
    })
  }

  editPost = () => {
    const post = {
      id: this.props.postId,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }

    readableAPI.editPost(post).then(post => {
      this.props.editPost(post)
      this.handleCloseModal()
    })
  }

  componentDidMount() {
    if (this.props.postId.length) {
      readableAPI.getPost(this.props.postId).then(post => {
        this.setState({
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category
        })
      })
    }
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog style={{ backgroundColor: 'rgba(0, 0, 0, 0.32)' }}>
          <Modal.Header>
            <Modal.Title>Add comment</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={12}>
                <FieldGroup
                  type="text"
                  label="Title"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleInput}
                />
              </Col>
              <Col md={12}>
                <FieldGroup
                  type="text"
                  label="Body"
                  placeholder="Body"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleInput}
                />
              </Col>
              <Col md={12}>
                <FieldGroup
                  type="text"
                  label="Author"
                  placeholder="Author"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleInput}
                />
              </Col>
              <Col md={12}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Category</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="Category"
                    name="category"
                    onChange={this.handleInput}
                    defaultValue={this.state.category || ''}
                  >
                    <option value="" disabled>
                      Select cateogry
                    </option>
                    {this.props.categories.categories.map(category => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleCloseModal}>Close</Button>
            {this.props.postId.length ? (
              <Button bsStyle="primary" onClick={this.editPost}>
                Edit post
              </Button>
            ) : (
              <Button bsStyle="primary" onClick={this.addPost}>
                Add post
              </Button>
            )}
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

const AddPostModalConnected = connect(mapStateToProps, mapDispatchToProps)(AddPostModal)
export default AddPostModalConnected
