import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getActiveCart,
  getCartDetail,
  adddNewCart,
  addNewCartDetail
} from '../store';

class AddToCartButton extends Component {
  constructor() {
    super();
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  async componentDidMount() {
    await this.props.getCart(this.props.userId);
    await this.props.getCartDetail(this.props.cartId);
  }

  handleAddClick(productId, productPrice) {
    const {isLoggedIn, userId, cartId, cart, cartDetail} = this.props;

    if (isLoggedIn) {
      if (cartId) {
        let prodIdArr = cartDetail.map(prod => prod.productId);
        if (prodIdArr.includes(productId)) {
          console.log('PUT || ONLY TO CARTPROD', productId, cart, cartDetail);
        } else {
          const addCartItemObj = {
            cartId: cartId,
            productId: productId,
            quantity: 1,
            totalPrice: productPrice
          };
          this.props.addCartItem(isLoggedIn, addCartItemObj);
        }
      } else {
        console.log('POST TO CART AND CARTPROD', cartId, this.props);
      }
    } else {
      console.log('Need Local Storage Functionality for Guests');
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

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cartId: state.cart.id,
    cart: state.cart,
    cartDetail: state.cartProduct
  };
};

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(getActiveCart(userId)),
    getCartDetail: cartId => dispatch(getCartDetail(cartId)),
    addCartItem: (isLoggedIn, newCartItem) =>
      dispatch(addNewCartDetail(isLoggedIn, newCartItem))
  };
};

export default withRouter(connect(mapState, mapDispatch)(AddToCartButton));
