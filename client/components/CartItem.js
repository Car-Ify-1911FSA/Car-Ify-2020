import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class CartItem extends Component {
  render() {
    return (
      <div>
        <h4>Cart Item Component</h4>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

export default connect(mapState)(CartItem)
