import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderHistoryThunk} from '../store/orderHistory';

class orderHistory extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.getOrderHistory(this.props.userId);
    }
  }

  render() {
    const orderHistory = this.props.orderHistory;
    console.log('createdAt', orderHistory[0]);
    return (
      <div>
        {orderHistory.map(cart => {
          return (
            <div>
              <h1 key="hello">{cart.status}</h1>
              <h1 key="hello">{cart.time}</h1>
              <h1 key="bye">
                {cart.products.map(product => {
                  return (
                    <div key="o">
                      <div>{product.brand}</div>
                      <div>{product.model}</div>
                      <div>{product.categor}y</div>
                      <div>{product.color}</div>
                      <div>{product.price}</div>
                      <div>{product.brand}</div>
                      <img src={product.imageUrl} />
                    </div>
                  );
                })}
              </h1>
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
    orderHistory: state.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory);
