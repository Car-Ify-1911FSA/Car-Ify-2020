import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActiveCart, getCartDetail} from '../store';
import CartItem from './CartItem';

class Cart extends Component {
  componentDidMount() {
    console.log('mount -', this.props, this.props.userId, this.props.cartId);
    this.props.fetchCart(this.props.userId);
    this.props.fetchCartDetail(this.props.cartId);
  }

  render() {
    const cart = this.props.cart;
    const products = cart.products;
    console.log('cart render -', this.props);

    return (
      <div className="cartFullDiv">
        <h1>{this.props.userName}'s Cart</h1>

        {!products ? (
          <div className="cartProductDiv">
            <p>Loading Cart Items</p>
          </div>
        ) : (
          <div className="cartProductDiv">
            <h3>Cart Items</h3>
            {products.map((order, idx) => (
              <CartItem key={idx} order={order} id={idx} />
            ))}
          </div>
        )}

        {!products ? (
          <div className="cartTotalDiv">
            <p>Loading Cart Summary</p>
          </div>
        ) : (
          <div className="cartTotalDiv">
            <h3>Cart Summary</h3>
            <h5>Total Quantity: {products.length}</h5>
            <h5>Total Price: {products.length}</h5>
          </div>
        )}

        <button
          type="button"
          className="paymentLinkBtn"
          onClick={() => this.props.history.push('/paymentAccounts')}
        >
          Continue to Payment
        </button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    userName: state.user.name,
    cartId: state.cart.id,
    cart: state.cart,
    cartDetail: state.cartDetail
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(getActiveCart(userId)),
    fetchCartDetail: cartId => dispatch(getCartDetail(cartId))
  };
};

export default connect(mapState, mapDispatch)(Cart);
