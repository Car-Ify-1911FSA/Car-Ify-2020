import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadProduct} from '../store'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  render() {
    const {
      imageUrl,
      brand,
      model,
      price,
      rating,
      description
    } = this.props.product
    return (
      <div className="single-prod-cont">
        <h2>{`${brand} ${model}`}</h2>
        <h3>{`$ ${price}`}</h3>
        <img src={imageUrl} className="single-image" />
        <h3>{rating}</h3>
        <p>{description}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: productId => {
      dispatch(loadProduct(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
