import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class AddToCartButton extends Component {
  constructor(props) {
    super(props)
    this.handleAddClick = this.handleAddClick.bind(this)
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
    isLoggedIn: !!state.user.id
  }
}

export default withRouter(connect(mapState)(AddToCartButton))
