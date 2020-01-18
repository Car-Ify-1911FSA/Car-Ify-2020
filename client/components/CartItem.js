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

  decrement(order) {
    console.log('decrementing!', order);
    if (order.quantity > 1) {
      this.props.editNewCartDetail({
        ...order,
        quantity: -1,
        totalPrice: -order.totalPrice / order.quantity
      });
    } else {
      this.props.deleteCartDetail(order);
    }
  }

  render() {
    const {order, id} = this.props;
    // console.log('render item', this.props);

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
        <button type="button" onClick={() => this.decrement(order)}>
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
