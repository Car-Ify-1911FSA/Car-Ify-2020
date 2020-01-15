import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CartItem from './CartItem';
import {getOrdersByUser} from '../store';

class Cart extends Component {
  componentDidMount() {
    console.log('mount -', this.props);
    this.props.fetchAllOrders(this.props.userId);
  }

  render() {
    const orders = this.props.orders;
    console.log('cart render -', orders, this.props);

    return (
      <div className="cartFullDiv">
        <h1>Cart</h1>
        {[].map((order, idx) => (
          <CartItem key={idx} order={order} />
        ))}
        <div className="cartTotalDiv">
          <h5>Cart Summary [BUILD]</h5>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    orders: state.orders
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAllOrders: userId => dispatch(getOrdersByUser(userId))
  };
};

export default connect(mapState, mapDispatch)(Cart);
