import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadAllProducts} from '../store'
import ProductCard from './ProductCard'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const state = this.props.location.state,
      filteredState = !state ? state.state : false

    console.log('All Product Render - ', state, filteredState)

    return (
      <div className="allProductFullDiv">
        <h1>Our Inventory:</h1>
        <div className="product-card-container">
          {this.props.allProducts.map(product => {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(loadAllProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
