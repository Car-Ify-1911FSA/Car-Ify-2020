import React, {Component} from 'react';
import {connect} from 'react-redux';

class CartItem extends Component {
  constructor() {
    super();
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {}

  decrement() {
    console.log('decrementing!');
  }

  render() {
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
        <button type="button" onClick={() => decrement()}>
          Subtract from Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
