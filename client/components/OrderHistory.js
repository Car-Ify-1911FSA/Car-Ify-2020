import React, {Component} from 'react';
import {connect} from 'react-redux';
import {gotOrderHistoryThunk} from '../store/orderHistory';

class orderHistory extends Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.getOrderHistory(this.props.userId);
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
    userId: state.user.id,
    orderHistory: state.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => {
      dispatch(gotOrderHistoryThunk(userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory);
