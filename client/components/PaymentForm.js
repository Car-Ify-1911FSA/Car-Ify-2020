import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPaymentOptions, addPaymentAcountThunk} from '../store';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentTypeId: 1,
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

    const optionId = this.props.paymentOptions.filter(
      el => el.type === this.state.payment
    )[0].id;
    this.setState(
      {...this.state, payment: newOption, paymentTypeId: optionId},
      () => this.props.updateSetter(this.state.payment, null, optionId)
    );
  }

  handleInput(evt) {
    this.setState(
      {
        ...this.state,
        inputField: evt.target.value
      },
      () => this.props.updateSetter(null, this.state.inputField)
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // CREATING A NEW PAYMENT ACOUNT
    const {paymentOptions, userId} = this.props;
    const optionId = paymentOptions.filter(
      el => el.type === this.state.payment
    )[0].id;
    const newPaymentAccount = {
      name: this.state.inputField,
      userId,
      paymentId: optionId
    };
    if (!newPaymentAccount.name) {
      alert('Please add account name!');
    } else {
      this.props.addPaymentAccount(newPaymentAccount);
      this.setState({
        payment: 'credit card',
        inputField: ''
      });
    }
  }

  render() {
    const {paymentOptions, userId} = this.props;

    return (
      <div className="paymentFormFullDiv">
        <h4 className="add-payment">Add Payment Option</h4>

        <div className="paymentFormInsideDiv">
          <div className="paymentFormDropDown">
            <label className="add-type">Type </label>
            <select
              className="paymentFormSelect"
              value={this.state.payment}
              onChange={this.handlePaymentChange}
            >
              {paymentOptions.map(option => (
                <option key={option.id}>{option.type}</option>
              ))}
            </select>
          </div>

          <form className="paymentFormForm">
            <label htmlFor="input" className="add-account-name">
              Account Name{' '}
            </label>
            <input
              name="input"
              placeholder="Account Name"
              value={this.state.inputField}
              onChange={this.handleInput}
              className="paymentFormInput"
              onFocus={e => {
                e.target.placeholder = '';
              }}
              onBlur={e => {
                e.target.placeholder = 'Account Name';
              }}
            ></input>
          </form>

          {userId ? (
            <button
              type="button"
              onClick={this.handleSubmit}
              className="paymentFormButton"
            >
              Add
            </button>
          ) : (
            ''
          )}
        </div>
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
