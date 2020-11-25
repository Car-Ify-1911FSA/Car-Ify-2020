import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getOrderHistoryThunk} from '../store/orderHistory';
import OrderHistoryProduct from './OrderHistoryProduct';

class recentHistory extends Component {
  componentDidMount() {
    this.props.getOrderHistory(this.props.userId);
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
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

  render() {
    let {recentHistory, username} = this.props;
    recentHistory = recentHistory.slice(0, 3);
    if (this.props.recentHistory.length) {
      if (this.props.recentHistory.length < 4) {
        this.props.history.push(`/orderHistory/${this.props.userId}`);
      }
    }
    return (
      <div className="fullOrderHistoryDiv">
        {recentHistory.map(cart => {
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
        {recentHistory.length ? (
          <Link to={`/orderHistory/${this.props.userId}`} className="view-full">
            <div>View Full Order History</div>
          </Link>
        ) : (
          <div className="no-order-history"> No Order History Available</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    username: state.user.name,
    recentHistory: state.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(recentHistory);
