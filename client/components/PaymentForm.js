import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPaymentOptions} from '../store';

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
    console.log(newOption);
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
    // more logic!
  }

  render() {
    const paymentOptions = this.props.paymentOptions;
    return (
      <div>
        <h4>Select your payment option:</h4>

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
    paymentOptions: state.paymentOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPaymentOptions: () => dispatch(getPaymentOptions())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
