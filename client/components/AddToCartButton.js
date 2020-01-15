import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getOrdersByUser} from '../store'

class AddToCartButton extends Component {
  constructor(props) {
    super(props)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  componentDidMount() {
    this.props.getOrdersByUser(this.props.userId)
  }

  handleAddClick() {
    this.props.isLoggedIn
      ? // [BUILD] function that manages adding to Cart, need to work on store prior to that in order to get CartId
        console.log('Nothing added yet')
      : this.props.history.push('/login')
  }

  render() {
    return (
      <div className="singleProdBtn">
        <button type="button" alt="Add To Cart" onClick={this.handleAddClick}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getOrdersByUser: userId => {
      dispatch(getOrdersByUser(userId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddToCartButton))
