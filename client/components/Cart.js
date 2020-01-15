import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CartItem from './CartItem'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const orders = this.props.orders

    return (
      <div className="cartFullDiv">
        <h1>Cart</h1>
        {orders.map((order, idx) => (
          <CartItem key={idx} order={order} />
        ))}
        <div className="cartTotalDiv">
          <h5>Cart Summary [BUILD]</h5>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllOrders: () => dispatch(getOrdersByUser())
  }
}

export default connect(mapState, mapDispatch)(Cart)
