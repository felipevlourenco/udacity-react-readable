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
import uuid from 'uuid/v4'
import { addComment } from '../store/actions/comments'

const mapStateToProps = state => {
  return { comments: state.comments }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => dispatch(addComment(comment))
  }
}

class CommentsModal extends Component {
  state = {}

  handleCloseModal = () => {
    this.props.closeModalAction()
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    readableAPI.getCommentsFromPost(this.props.postId).then(comments => {
      console.log('====================================')
      console.log(comments)
      console.log('====================================')
    })
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog style={{ backgroundColor: 'rgba(0, 0, 0, 0.32)' }}>
          <Modal.Header>
            <Modal.Title>Comment</Modal.Title>
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
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleCloseModal}>Close</Button>
            <Button bsStyle="primary">Comment</Button>
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

const CommentsModalConnected = connect(mapStateToProps, mapDispatchToProps)(CommentsModal)
export default CommentsModalConnected
