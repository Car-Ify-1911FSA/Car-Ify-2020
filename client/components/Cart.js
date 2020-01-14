import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CartItem from './CartItem'

class Cart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="cartFullDiv">
        <h1>Cart</h1>
        <CartItem />
        <div className="cartTotalDiv">
          <h5>Cart Summary [BUILD]</h5>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

export default connect(mapState)(Cart)
