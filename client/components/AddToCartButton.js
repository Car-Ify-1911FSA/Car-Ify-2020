import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getActiveCart,
  getCartDetail,
  addNewCart,
  addNewCartDetail,
  editNewCartDetail
} from '../store';

class AddToCartButton extends Component {
  constructor() {
    super();
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  async componentDidMount() {
    if (this.props.cartId) {
      await this.props.getCart(this.props.userId);
      await this.props.getCartDetail(this.props.cartId);
    }
  }

  handleAddClick(productId, productPrice) {
    const {isLoggedIn, userId, cartId, cart, cartDetail} = this.props,
      cartItemObj = {
        cartId: cartId,
        productId: productId,
        quantity: 1,
        totalPrice: productPrice
      },
      newCart = {
        status: 'active',
        time: Date(),
        userId: userId
      };

    if (isLoggedIn) {
      if (cartId) {
        let prodIdArr = cartDetail.map(prod => prod.productId);
        if (prodIdArr.includes(productId)) {
          console.log('PUT || ONLY TO CARTPROD', cartItemObj);
          // PUTTING
          // this.props.editCartItem(isLoggedIn, editCartItemObj);
        } else {
          // POSTING
          this.props.addCartItem(isLoggedIn, cartItemObj);
        }
      } else {
        console.log('POST TO CART AND CARTPROD', cartId, newCart);
        this.props.addNewCart(newCart);
        console.log('AFTER POSTING CART', this.props.cart);
        this.props.addCartItem(isLoggedIn, cartItemObj);
      }
    } else {
      console.log('Need Local Storage Functionality for Guests');
      this.props.addCartItem(isLoggedIn, cartItemObj);
    }
  }

  render() {
    return (
      <div className="addBtnDiv">
        <button
          type="button"
          onClick={() =>
            this.handleAddClick(this.props.product.id, this.props.product.price)
          }
          className="addBtn"
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cartId: state.cart.id,
    cart: state.cart,
    cartDetail: state.cartProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getActiveCart(userId)),
    getCartDetail: cartId => dispatch(getCartDetail(cartId)),
    addNewCart: newCart => dispatch(addNewCart(newCart)),
    addCartItem: (isLoggedIn, newCartItem) =>
      dispatch(addNewCartDetail(isLoggedIn, newCartItem)),
    editCartItem: (isLoggedIn, editCartItem) =>
      dispatch(editNewCartDetail(isLoggedIn, editCartItem))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddToCartButton)
);
