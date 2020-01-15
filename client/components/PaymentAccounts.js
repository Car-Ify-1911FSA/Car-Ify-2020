import React, {Component} from 'react'
import {getPaymentAccountsThunk} from '../store/paymentAccounts'
import {connect} from 'react-redux'
import PaymentCard from './PaymentCard'

class PaymentAccounts extends Component {
  componentDidMount() {
    this.props.fetchAllPaymentAccounts()
  }

  render() {
    // console.log(this.props.paymentAccounts)
    const allAccounts = this.props.paymentAccounts
    const filterAccounts = allAccounts.filter(
      acct => acct.userId === this.props.userId
    )

    console.log('render -', this.props.userId, allAccounts, filterAccounts)
    return (
      <div>
        <h3>All Payment Accounts</h3>
        {filterAccounts.map((acct, idx) => (
          <PaymentCard acct={acct} key={idx} />
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    paymentAccounts: state.paymentAccounts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllPaymentAccounts: () => {
      dispatch(getPaymentAccountsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(PaymentAccounts)
