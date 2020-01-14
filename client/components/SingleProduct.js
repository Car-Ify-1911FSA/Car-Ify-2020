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
      <div>
        <h2>{`${brand} ${model}`}</h2>
        <h3>{price}</h3>
        <img src={imageUrl} />
        <h3>{rating}</h3>
        <p>{description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => {
      dispatch(loadProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
