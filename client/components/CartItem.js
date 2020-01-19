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
    if (userId) {
      console.log(this.props);
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
      <tr>
        <td className="tg-cly1">
          <img src={order.imageUrl} width="70px" />
        </td>
        <td className="tg-cly1">{order.brand}</td>
        <td className="tg-cly1">{order.model}</td>
        <td className="tg-cly1 ">
          <span className="qty-row">{order.quantity}</span>

          <button type="button" onClick={() => this.decrement(userId, order)}>
            -
          </button>
          <button type="button">+</button>
        </td>
        <td className="tg-cly1">{`$${order.price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
        <td className="tg-cly1">{`$${order.totalPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
      </tr>
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
