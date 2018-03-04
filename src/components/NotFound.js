import React, { Component } from 'react'
import * as readableAPI from './../utils/readableAPIUtils'
import { Button } from 'react-bootstrap'

import { connect } from 'react-redux'

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
  return {}
}

class NotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        Page Not found
        <Button
          bsStyle="primary"
          className="paddinBtn"
          onClick={() => (window.location.href = '/')}
        >
          Go to Home
        </Button>
      </div>
    )
  }
}

const NotFoundConnected = connect(mapStateToProps, mapDispatchToProps)(NotFound)
export default NotFoundConnected
