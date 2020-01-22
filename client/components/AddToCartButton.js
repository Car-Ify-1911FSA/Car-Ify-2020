import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getActiveCart,
  getCartDetail,
  addNewCartDetail,
  editNewCartDetail
} from '../store';

class AddToCartButton extends Component {
  constructor() {
    super();
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount() {
    if (this.props.userId)
      Promise.all([this.props.getCart(this.props.userId)]).then(() => {
        this.props.getCartDetail(this.props.cart.id);
      });
  }

  handleAddClick(productId, productPrice, qty) {
    if (qty < 1) return alert('Sorry, please wait while we restock!');

    const {isLoggedIn, cart, cartDetail} = this.props,
      cartItemObj = {
        cartId: cart ? cart.id : undefined,
        productId: productId,
        quantity: 1,
        totalPrice: productPrice
      };

    let prodIdArr = [];
    if (cartDetail) prodIdArr = cartDetail.map(prod => prod.productId);
    if (prodIdArr.includes(productId))
      this.props.editCartItem(isLoggedIn, cartItemObj);
    else this.props.addCartItem(isLoggedIn, cartItemObj);
  }

  render() {
    return (
      <div className="addBtnDiv">
        <button
          type="button"
          onClick={() =>
            this.handleAddClick(
              this.props.product.id,
              this.props.product.price,
              this.props.updatedQty
            )
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
    cart: state.cart,
    cartDetail: state.cartProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getActiveCart(userId)),
    getCartDetail: cartId => dispatch(getCartDetail(cartId)),
    addCartItem: (isLoggedIn, newCartItem) =>
      dispatch(addNewCartDetail(isLoggedIn, newCartItem)),
    editCartItem: (isLoggedIn, editCartItem) =>
      dispatch(editNewCartDetail(isLoggedIn, editCartItem))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddToCartButton)
);
