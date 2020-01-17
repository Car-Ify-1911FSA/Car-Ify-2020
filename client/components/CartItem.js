import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editNewCartDetail, deleteCartDetail} from '../store';

class CartItem extends Component {
  constructor() {
    super();
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {}

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
    console.log('render', this.props);
    return !order ? (
      ''
    ) : (
      <div className="cartItemFullDiv">
        <h4>{id}</h4>
        Model:<h4>{order.model}</h4>
        Brand:<h4>{order.brand}</h4>
        Quantity:<h4>{order.quantity}</h4>
        Price:
        <h4>{`$${order.totalPrice
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
    deleteCartDetail: editCartItem => dispatch(deleteCartDetail(editCartItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
