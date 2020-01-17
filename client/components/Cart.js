import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActiveCart, getCartDetail} from '../store';
import {Link} from 'react-router-dom';
import CartItem from './CartItem';

class Cart extends Component {
  constructor() {
    super();
    this.calcTotalPrice = this.calcTotalPrice.bind(this);
  }

  componentDidMount() {
    if (this.props.userId) {
      Promise.all([this.props.fetchCart(this.props.userId)]).then(() => {
        if (this.props.cart) this.props.fetchCartDetail(this.props.cart.id);
      });

      // if (this.props.userId) {
      //   await this.props.fetchCart(this.props.userId);
      //   if (this.props.cart) await this.props.fetchCartDetail(this.props.cart.id);
    } else {
      this.props.fetchCart();
      this.props.fetchCartDetail();
    }
  }

  calcTotalPrice(cartDetail) {
    let total = 0;
    if (!cartDetail) return `$${total}`;
    cartDetail.forEach(item => {
      total += item.totalPrice;
    });
    return `$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  render() {
    const {cart, cartDetail} = this.props;
    const products = cart ? cart.products : undefined;

    return (
      <div className="cartFullDiv">
        <h1>{this.props.userName ? this.props.userName : 'Guest'}'s Cart</h1>

        {!products || products.length < 1 ? (
          <div className="cartProductDiv">
            <h3>No Current Cart Items</h3>
          </div>
        ) : (
          <div className="cartProductDiv">
            <h3 className="headerDiv">Cart Items</h3>
            {products.map((order, idx) => (
              <CartItem key={idx} order={order} id={idx + 1} />
            ))}
          </div>
        )}

        <div className="cartTotalDiv">
          <h3 className="headerDiv">Cart Summary</h3>
          <h5>
            Total Quantity:{' '}
            {!cartDetail
              ? 0
              : cartDetail.reduce((acm, val) => {
                  return (acm += val.quantity);
                }, 0)}
          </h5>
          <h5>Total Price: {this.calcTotalPrice(cartDetail)}</h5>
        </div>

        {cartDetail && cartDetail.length > 0 ? (
          <Link
            to={{
              pathname: '/paymentAccounts',
              state: {cart: this.props.cart, cartDetail: cartDetail}
            }}
            className="paymentLinkBtn linkText"
          >
            Continue to Payment
          </Link>
        ) : (
          <Link to="/allProducts" className="paymentLinkBtn linkText">
            Let's Go Shop
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    userName: state.user.name,
    cart: state.cart,
    cartDetail: state.cartProduct,
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: userId => dispatch(getActiveCart(userId)),
    fetchCartDetail: cartId => dispatch(getCartDetail(cartId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
