import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRecentOrderHistoryThunk} from '../store/recentOrderHistory';
import OrderHistoryProduct from './OrderHistoryProduct';

class recentHistory extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.getRecentHistory(this.props.userId);
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
      <h1>HELLO</h1>
      //   <div>
      //     <h1>{username}'s Order History:</h1>
      //     {recentHistory.map(cart => {
      //       return (
      //         <div>
      //           <div className="cart-center">
      //             <div>Total Price: ${this.totalSum(cart.products)}</div>
      //             <div>Date: {cart.time}</div>
      //           </div>
      //           <div className="cart-margin">
      //             {cart.products.map(product => {
      //               return (
      //                 <div>
      //                   <OrderHistoryProduct product={product} date={cart.time} />
      //                 </div>
      //               );
      //             })}
      //           </div>
      //         </div>
      //       );
      //     })}
      //   </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    username: state.user.name,
    recentHistory: state.recentHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecentHistory: userId => dispatch(getRecentOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(recentHistory);
