import React, {Component} from 'react'
import {getAllPaymentsThunk} from '../store/allPayments'
import {connect} from 'react-redux'

class AllPayments extends Component {
  componentDidMount() {
    this.props.fetchAllPayments()
  }
  render() {
    return <h3>All Payments</h3>
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
