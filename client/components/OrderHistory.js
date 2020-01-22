import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderHistoryThunk} from '../store/orderHistory';

class orderHistory extends Component {
  componentDidMount() {
    if (this.props.id) {
      this.props.getOrderHistory(this.props.id);
    }
  }
  render() {
    console.log('userId', this.props.id);

    console.log('props', this.props);
    return <div>HELLO WORLD</div>;
  }
}

const mapStateToProps = state => {
  return {
    id: state.user.id,
    orderHistory: state.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistoryThunk(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory);
