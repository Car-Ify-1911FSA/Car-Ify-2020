import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartItem from './CartItem';
import {getActiveCart} from '../store';

class Cart extends Component {
  componentDidMount() {
    console.log('mount -', this.props, this.props.userId);
    this.props.fetchCart(this.props.userId);
  }

  render() {
    const cart = this.props.cart;
    const products = cart.products;
    console.log('cart render -', cart, products);

    return (
      <div className="cartFullDiv">
        <h1>Cart</h1>
        {!products ? (
          <p>Loading Cart</p>
        ) : (
          products.map((order, idx) => <CartItem key={idx} order={order} />)
        )}
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
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(getActiveCart(userId))
  };
};

export default connect(mapState, mapDispatch)(Cart);
