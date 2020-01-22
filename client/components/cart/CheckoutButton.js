import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getActiveCart,
  getCartDetail,
  editProducts,
  addNewCart,
  editCart
} from '../../store';

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
    let resArr = [];
    for (let item of cart) {
      if (item.quantity > prodHash[item.productId].quantity) {
        alert(
          `Sorry, we don't have enough of ${prodHash[item.productId].brand} ${
            prodHash[item.productId].model
          } !`
        );
        this.props.history.push('/cart');
        return false;
      } else {
        let obj = {};
        obj.productId = item.productId;
        obj.quantity = item.quantity;
        resArr.push(obj);
      }
    }
    return resArr;
  }

  handleCheckOut() {
    const {userId, allProducts, cart, cartDetail} = this.props;

    if (userId) {
      // LOGGED IN USER SO IMPACT DB
      let allProdHash = {};
      for (let prod of allProducts) {
        allProdHash[prod.id] = prod;
      }

      if (this.checkQuantity(cartDetail, allProdHash)) {
        // UPDATING PRODUCT TABLE WITH DECREMENTED QUANTITES
        let prodQuantity = this.checkQuantity(cartDetail, allProdHash);
        prodQuantity.map(item => this.props.editProducts(item));

        // UPDATING CART STATUS TO PAID
        this.props.editCart(cart.id, this.props.paymentAccountId);

        // CREATE NEW ACTIVE CART WITH USERID
        const newCart = {
          status: 'active',
          time: Date(),
          userId: userId
        };
        this.props.addNewCart(userId, newCart);

        // PUSHES WEBPAGE TO GO HOME
        this.props.history.push('/');
      }
    } else {
      // GUEST SHOULDN'T HAVE ACCESS TO PAYMENT PAGE SO PUSH TO HOME
      console.log('HERE WE GO ! - ', this.props);
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="checkoutBtnDiv">
        <button
          type="button"
          className="checkoutBtn linkText"
          onClick={() => this.handleCheckOut()}
        >
          {/* {userId ? `Check Out !` : `Login / Sign-Up`} */}
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
    editCart: (cartId, paymentAccountId) =>
      dispatch(editCart(cartId, paymentAccountId)),
    addNewCart: (userId, newCart) => dispatch(addNewCart(userId, newCart)),
    editProducts: editProduct => dispatch(editProducts(editProduct))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutButton)
);
