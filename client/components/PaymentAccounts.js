import React, {Component} from 'react'
import {getAllPaymentsThunk} from '../store/allPayments'
import {connect} from 'react-redux'
import Payment from './Payment'

class AllPayments extends Component {
  componentDidMount() {
    this.props.fetchAllPayments()
  }
  render() {
    return (
      <div>
        <h3>All Payments</h3>
        {this.props.allPayments.map(payment => (
          <div key={payment.id}>
            <Payment payment={payment} />
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allPayments: state.allPaymets
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllPayments: () => {
      dispatch(getAllPaymentsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(AllPayments)
