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
        <OrderHistoryProduct product={orderHistory} />
      </div>
      // <div>
      //   {orderHistory.map(cart => {
      //     return (
      //       <div>
      //         <div key="cartStatus">{cart.status}</div>
      //         <div key="cartTime">{cart.time}</div>
      //         <div key="cartProducts">
      //           {cart.products.map(product => {
      //             return (
      //               <div key="product">
      //                 <div>{product.brand}:</div>
      //                 <div>{product.model}</div>
      //                 <div>{product.categor}y</div>
      //                 <div>{product.color}</div>
      //                 <div>{product.price}</div>
      //                 <div>{product.brand}</div>
      //                 <img src={product.imageUrl} />
      //               </div>
      //             );
      //           })}
      //         </div>
      //       </div>
      //     );
      //   })}
      // </div>
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
