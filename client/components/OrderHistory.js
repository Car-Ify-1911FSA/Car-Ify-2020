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

  cartSort(time) {}

  render() {
    const orderHistory = this.props.orderHistory;
    // console.log('createdAt', orderHistory[0].time);
    // for(let key in orderHistory[0]){
    //   console.log(key, orderHistory[0][key])
    // }
    return (
      <div>
        <h1>Your Order History:</h1>
        {orderHistory.map(cart => {
          return (
            <div>
              <h2 key="cartStatus">{cart.status.toUpperCase()}:</h2>
              <div key="cartProducts">
                {cart.products.map(product => {
                  return (
                    <div>
                      <OrderHistoryProduct
                        key="product"
                        product={product}
                        date={cart.time}
                      />
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
    orderHistory: state.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory);
