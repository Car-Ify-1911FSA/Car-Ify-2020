import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActiveCart, getCartDetail} from '../store';
import CartItem from './CartItem';

class Cart extends Component {
  constructor() {
    super();
    this.calcTotalPrice = this.calcTotalPrice.bind(this);
  }

  async componentDidMount() {
    // console.log('mount -', this.props, this.props.userId, this.props.cartId);
    if (this.props.userId) await this.props.fetchCart(this.props.userId);
    if (this.props.cartId) {
      await this.props.fetchCartDetail(this.props.cartId);
      // this.props.fetchCartDetail(3); // TEMP REMOVE !!!!!!
    }
  }

  calcTotalPrice(cartDetail) {
    let total = 0;
    cartDetail.forEach(item => {
      total += item.totalPrice;
    });
    return `$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  render() {
    const {cart, cartDetail} = this.props;
    const products = cart.products;
    console.log('cart render -', this.props, cartDetail);

    return (
      <div className="cartFullDiv">
        <h1>{this.props.userName}'s Cart</h1>

        {!products ? (
          <div className="cartProductDiv">
            <p>No Current Cart Items</p>
          </div>
        ) : (
          <div className="cartProductDiv">
            <h3>Cart Items</h3>
            {products.map((order, idx) => (
              <CartItem key={idx} order={order} id={idx} />
            ))}
          </div>
        )}

        {!Array.isArray(cartDetail) ? (
          <div className="cartTotalDiv">
            <p>Empty Cart !</p>
          </div>
        ) : (
          <div className="cartTotalDiv">
            <h3>Cart Summary</h3>
            <h5>Total Quantity: {cartDetail.length}</h5>
            <h5>Total Price: {this.calcTotalPrice(cartDetail)}</h5>
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
    cartDetail: state.cartProduct,
    state: state
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(getActiveCart(userId)),
    fetchCartDetail: cartId => dispatch(getCartDetail(cartId))
  };
};

export default connect(mapState, mapDispatch)(Cart);
