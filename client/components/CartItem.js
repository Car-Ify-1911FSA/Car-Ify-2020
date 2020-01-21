import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editNewCartDetail, deleteCartDetail, getCartDetail} from '../store';

class CartItem extends Component {
  constructor() {
    super();
    this.editQty = this.editQty.bind(this);
  }

  componentDidMount() {
    this.props.fetchCartDetail(this.props.order.cartId);
  }

  editQty(userId, order, operation) {
    if (userId) {
      // LOGGED IN USER SO IMPACT DB
      if (order.quantity === 1 && operation === 'decrement') {
        // DELETE ITEM SINCE ONLY 1 QUANTITY (DELETE REQUEST)
        this.props.deleteCartDetail(order);
      } else {
        // DECREMENT QUANTITY SINCE GREATER THAN 1 (PUT REQUEST)
        this.props.editNewCartDetail({
          ...order,
          quantity: operation === 'decrement' ? -1 : +1,
          totalPrice:
            operation === 'decrement'
              ? -order.totalPrice / order.quantity
              : +order.totalPrice / order.quantity
        });
      }
    } else {
      // GUEST USER SO IMPACT LOCAL STORAGE
      const guestCart = JSON.parse(localStorage.getItem('cart'));
      const decrementIdx = guestCart.findIndex(
        item => item.productId === order.productId
      );
      const decrementItem = guestCart[decrementIdx];
      if (operation === 'decrement') {
        decrementItem.quantity--;
        decrementItem.totalPrice -= order.price;
      } else {
        decrementItem.quantity++;
        decrementItem.totalPrice += order.price;
      }
      if (decrementItem.quantity < 1) guestCart.splice(decrementIdx, 1);
      localStorage.setItem('cart', JSON.stringify(guestCart));
      this.props.fetchCartDetail();
    }
  }

  render() {
    const {userId, order} = this.props;

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

          <button
            type="button"
            onClick={() => this.editQty(userId, order, 'decrement')}
          >
            -
          </button>
          <button
            type="button"
            onClick={() => this.editQty(userId, order, 'increment')}
          >
            +
          </button>
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

const mapDispatchToProps = dispatch => {
  return {
    editNewCartDetail: editCartItem =>
      dispatch(editNewCartDetail(true, editCartItem)),
    deleteCartDetail: editCartItem => dispatch(deleteCartDetail(editCartItem)),
    fetchCartDetail: cartId => dispatch(getCartDetail(cartId))
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
