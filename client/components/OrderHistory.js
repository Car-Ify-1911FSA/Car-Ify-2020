import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderHistoryThunk} from '../store/orderHistory';
import OrderHistoryProduct from './OrderHistoryProduct';

class orderHistory extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.getOrderHistory(this.props.userId);
    }
  }

  totalSum(arr) {
    let count = 0;
    if (arr) {
      arr.forEach(elem => {
        count += elem.price * elem.quantity;
      });
      return count;
    }
  }

  recentThree(cartHistory) {
    if (cartHistory.length) {
      if (cartHistory.length > 3) {
        return cartHistory;
      } else {
        return [cartHistory.shift(), cartHistory.shift(), cartHistory.shift()];
      }
    }
  }

  render() {
    const {orderHistory, username} = this.props;

    return (
      <div>
        <h1>Full Order History:</h1>
        {orderHistory.map(cart => {
          return (
            <div>
              <div className="cart-center">
                <div>Total Price: ${this.totalSum(cart.products)}</div>
                <div>Date: {cart.time}</div>
              </div>
              <div className="cart-margin">
                {cart.products.map(product => {
                  return (
                    <div>
                      <OrderHistoryProduct product={product} date={cart.time} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    username: state.user.name,
    orderHistory: state.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory);
