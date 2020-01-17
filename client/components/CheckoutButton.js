import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  getActiveCart,
  getCartDetail,
  addNewCartDetail,
  editNewCartDetail
} from '../store';

class CheckoutButton extends Component {
  constructor() {
    super();
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  componentDidMount() {}

  handleCheckOut() {}

  render() {
    return (
      <div>
        <button
          type="button"
          className="checkoutBtn"
          onClick={() => this.handleCheckOut()}
        >
          Check Out !
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutButton)
);
