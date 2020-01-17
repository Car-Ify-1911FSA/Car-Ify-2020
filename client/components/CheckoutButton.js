import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class CheckoutButton extends Component {
  render() {
    return (
      <div>
        <button type="button" className="checkoutBtn">
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
