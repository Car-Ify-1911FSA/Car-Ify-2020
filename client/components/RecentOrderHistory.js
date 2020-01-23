import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getOrderHistoryThunk} from '../store/orderHistory';
import OrderHistoryProduct from './OrderHistoryProduct';

class recentHistory extends Component {
  componentDidMount() {
    this.props.getOrderHistory(this.props.userId);
  }

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

  render() {
    console.log(this.props);
    const {recentHistory, username} = this.props;

    return (
      <div>
        <h1>{username}'s Most Recent History:</h1>
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
            </div>
          );
        })}
        <Link to={`/orderHistory/${this.props.userId}`} className="view-full">
          <div>View Full Order History</div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    username: state.user.name,
    recentHistory: state.orderHistory.slice(0, 3)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(recentHistory);
