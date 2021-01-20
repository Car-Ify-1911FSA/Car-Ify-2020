import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderHistoryThunk} from '../store/orderHistory';
import OrderHistoryProduct from './OrderHistoryProduct';

class orderHistory extends Component {
  componentDidMount() {
    this.props.getOrderHistory(this.props.userId);
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
    const {orderHistory, username, userId} = this.props;
    if (!orderHistory.length) {
      this.props.history.push(`/userProfile/${userId}`);
      alert('"You currently do not have any order history to display');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.getOrderHistory(this.props.userId);
    }
  }

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
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
    const {orderHistory, username, userId} = this.props;
    return (
      <div className="fullOrderHistoryDiv">
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
              <div className="space" />
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
