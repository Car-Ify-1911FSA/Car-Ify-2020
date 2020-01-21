import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderHistoryThunk} from '../store/cart';

class orderHistory extends Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.getOrderHistory(2);
    }
  }
  render() {
    console.log('userId', this.props.userId);

    console.log('props', this.props);
    return <div>HELLO WORLD</div>;
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    orderHistory: state.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory);
