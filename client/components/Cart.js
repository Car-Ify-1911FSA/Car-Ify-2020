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
    if (this.props.userId) {
      await this.props.fetchCart(this.props.userId);
      if (this.props.cartId)
        await this.props.fetchCartDetail(this.props.cartId);
      // this.props.fetchCartDetail(3); // TEMP REMOVE !!!!!!
    } else {
      this.props.fetchCart();
      this.props.fetchCartDetail();
    }
  }

  calcTotalPrice(cartDetail) {
    let total = 0;
    cartDetail.forEach(item => {
      total += item.totalPrice;
    });
    return `$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  getProductDataForGuest(inventory, cartProd) {
    return cartProd.map(prod => {
      return inventory.find(el => el.id === prod.productId);
    });
  }

  render() {
    const {cart, cartDetail, allProducts} = this.props;
    const guestCart = JSON.parse(localStorage.getItem('cart'));
    const guestProd = this.getProductDataForGuest(allProducts, guestCart);
    const products = this.props.userId ? cart.products : guestProd;
    console.log('GUEST_CART ====', cartDetail);

    // console.log('cart render -', this.props, cartDetail);
    return (
      <div className="cartFullDiv">
        <h1>{this.props.userName ? this.props.userName : 'Guest'}'s Cart</h1>

        {!products.length ? null : (
          <div className="cartProductDiv">
            <h3>Cart Items</h3>
            {products.map((order, idx) => (
              <CartItem key={idx} order={order} id={idx + 1} />
            ))}
          </div>
        )}

        {!cartDetail.length ? (
          <div className="cartTotalDiv">
            <p>Your Cart is Empty!</p>
          </div>
        ) : (
          <div className="cartTotalDiv">
            <h3>Cart Summary</h3>
            <h5>
              Total Quantity:{' '}
              {cartDetail.reduce((acm, val) => {
                return (acm += val.quantity);
              }, 0)}
            </h5>
            <h5>Total Price: {this.calcTotalPrice(cartDetail)}</h5>
            <button
              type="button"
              className="paymentLinkBtn"
              onClick={() => this.props.history.push('/paymentAccounts')}
            >
              Continue to Payment
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    userName: state.user.name,
    cartId: state.cart.id,
    cart: state.cart,
    cartDetail: state.cartProduct,
    state: state,
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: userId => dispatch(getActiveCart(userId)),
    fetchCartDetail: cartId => dispatch(getCartDetail(cartId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
