import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editNewCartDetail, deleteCartDetail, getCartDetail} from '../store';

class CartItem extends Component {
  constructor() {
    super();
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.props.fetchCartDetail(this.props.order.cartId);
  }

  decrement(userId, order) {
    console.log('decrementing!', userId, order);
    if (userId) {
      // LOGGED IN USER SO IMPACT DB
      if (order.quantity > 1) {
        // DECREMENT QUANTITY SINCE GREATER THAN 1 (PUT REQUEST)
        this.props.editNewCartDetail({
          ...order,
          quantity: -1,
          totalPrice: -order.totalPrice / order.quantity
        });
      } else {
        // DELETE ITEM SINCE ONLY 1 QUANTITY (DELETE REQUEST)
        this.props.deleteCartDetail(order);
      }
    } else {
      // GUEST USER SO IMPACT LOCAL STORAGE
      const guestCart = JSON.parse(localStorage.getItem('cart'));
      const decrementIdx = guestCart.findIndex(
        item => item.productId === order.productId
      );
      const decrementItem = guestCart[decrementIdx];
      decrementItem.quantity--;
      if (decrementItem.quantity < 1) guestCart.splice(decrementIdx, 1);
      localStorage.setItem('cart', JSON.stringify(guestCart));
      this.props.fetchCartDetail();
    }
  }

  render() {
    const {userId, order, id} = this.props;

    return !order ? (
      ''
    ) : (
      <div className="cartItemFullDiv">
        <h4 className="cartItemH4">{id}</h4>
        <h4 className="cartItemH4">Model: {order.model}</h4>
        <h4 className="cartItemH4">Brand: {order.brand}</h4>
        <h4 className="cartItemH4">Quantity: {order.quantity}</h4>
        <h4 className="cartItemH4">{`Price: $${order.totalPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</h4>
        <button type="button" onClick={() => this.decrement(userId, order)}>
          Subtract from Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editNewCartDetail: editCartItem =>
      dispatch(editNewCartDetail(editCartItem)),
    deleteCartDetail: editCartItem => dispatch(deleteCartDetail(editCartItem)),
    fetchCartDetail: cartId => dispatch(getCartDetail(cartId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
