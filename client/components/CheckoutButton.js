import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getActiveCart,
  getCartDetail,
  addNewCartDetail,
  editNewCartDetail,
  addNewCart,
  editCart
} from '../store';

class CheckoutButton extends Component {
  constructor() {
    super();
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  componentDidMount() {
    // console.log('mounting -', this.props);
    if (this.props.userId)
      Promise.all([this.props.getCart(this.props.userId)]).then(() => {
        this.props.getCartDetail(this.props.cart.id);
      });
  }

  handleCheckOut() {
    const {userId, allProducts, cart, cartDetail} = this.props;
    console.log('CHECKING OUT', userId, allProducts, cart, cartDetail);

    if (userId) {
      // UPDATING PRODUCT TABLE WITH DECREMENTED QUANTITES (CHECK)

      // UPDATING CART STATUS TO PAID
      this.props.editCart(cart.id);

      // CREATE NEW ACTIVE CART WITH USERID
      const newCart = {
        status: 'active',
        time: Date(),
        userId: userId
      };
      this.props.addNewCart(userId, newCart);
    } else {
      // FOR GUESTS: FORCE LOGIN / SIGNUP?
      console.log('LOGIC FOR GUESTS CHECKOUT');
    }
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="checkoutBtn"
          onClick={() => this.handleCheckOut()}
        >
          Check Out !
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    userId: state.user.id,
    cart: state.cart,
    cartDetail: state.cartProduct,
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getActiveCart(userId)),
    getCartDetail: cartId => dispatch(getCartDetail(cartId)),
    editCart: cartId => dispatch(editCart(cartId)),
    addNewCart: (userId, newCart) => dispatch(addNewCart(userId, newCart))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutButton)
);
