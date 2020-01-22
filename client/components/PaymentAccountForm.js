import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addPaymentAcountThunk} from '../store/paymentAccounts';

class PaymentAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      account: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const paymentAccount = this.state;
    event.preventDefault();
    this.props.addPaymentAccountThunk(paymentAccount);
    this.setState({
      type: '',
      account: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Account Type:
          <input
            type="text"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Account Name:
          <input
            type="text"
            name="account"
            value={this.state.account}
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPaymentAcountThunk: paymentAccount =>
      dispatch(addPaymentAcountThunk(paymentAccount))
  };
};

export default connect(null, mapDispatchToProps)(PaymentAccountForm);
