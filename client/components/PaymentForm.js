import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPaymentOptions, addPaymentAcountThunk} from '../store';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'credit card',
      inputField: ''
    };
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchPaymentOptions();
  }

  handlePaymentChange(evt) {
    const newOption = evt.target.value;
    console.log(evt);
    this.setState({...this.state, payment: newOption});
    console.log('LOCAL STATE', this.state);
  }

  handleInput(evt) {
    this.setState({
      ...this.state,
      inputField: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // creating a new payment account
    const {paymentOptions, userId} = this.props;
    const optionId = paymentOptions.filter(
      el => el.type === this.state.payment
    )[0].id;
    const newPaymentAccount = {
      name: this.state.inputField,
      userId,
      paymentId: optionId
    };
    this.props.addPaymentAccount(newPaymentAccount);
    this.setState({
      payment: 'credit card',
      inputField: ''
    });
  }

  render() {
    const paymentOptions = this.props.paymentOptions;
    return (
      <div>
        <h4>Add a payment option:</h4>

        <div>
          <br />
          <select
            value={this.state.payment}
            onChange={this.handlePaymentChange}
          >
            {paymentOptions.map(option => (
              <option key={option.id}>{option.type}</option>
            ))}
          </select>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="input">Input:</label>
          <input
            name="input"
            placeholder="Your number"
            value={this.state.inputField}
            onChange={this.handleInput}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    paymentOptions: state.paymentOptions,
    userId: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPaymentOptions: () => dispatch(getPaymentOptions()),
    addPaymentAccount: account => dispatch(addPaymentAcountThunk(account))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);