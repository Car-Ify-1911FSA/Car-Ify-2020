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
    this.checkQuantity = this.checkQuantity.bind(this);
  }

  componentDidMount() {
    if (this.props.userId)
      Promise.all([this.props.getCart(this.props.userId)]).then(() => {
        this.props.getCartDetail(this.props.cart.id);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      Promise.all([this.props.getCart(this.props.userId)]).then(() => {
        this.props.getCartDetail(this.props.cart.id);
      });
    }
  }

  checkQuantity(cart, prodHash) {
    for (let item of cart) {
      if (item.quantity > prodHash[item.id].quantity) {
        alert(`Sorry, we don't have enough of ${item}`);
        return false;
      }
    }
    return true;
  }

  handleCheckOut() {
    const {userId, allProducts, cart, cartDetail} = this.props;
    // console.log('CHECKING OUT', userId, allProducts, cart, cartDetail);
    console.log('CHECK OUT', allProducts, cartDetail);

    const test = false;
    if (userId && test) {
      // UPDATING PRODUCT TABLE WITH DECREMENTED QUANTITES (CHECK)
      let allProdHash = {};
      for (let prod of allProducts) {
        allProdHash[prod.id] = prod;
      }

      if (this.checkQuantity(cartDetail, allProdHash)) {
        console.log('START EDITTING PRODUCT TABLE!!');
      }

      // UPDATING CART STATUS TO PAID
      this.props.editCart(cart.id);

      // CREATE NEW ACTIVE CART WITH USERID
      const newCart = {
        status: 'active',
        time: Date(),
        userId: userId
      };
      this.props.addNewCart(userId, newCart);

      // PUSHES WEBPAGE TO GO HOME
      this.props.history.push('/');
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
          className="checkoutBtn linkText"
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
