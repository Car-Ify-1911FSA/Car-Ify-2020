import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    return (
      <div className="cartFullDiv">
        <h1>Cart</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

export default connect(mapState)(Cart)
