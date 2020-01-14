import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadAllProducts} from '../store'
import ProductCard from './ProductCard'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchAllProducts()
    console.log('all product test 1')
  }

  render() {
    console.log('all product test')
    return (
      <div>
        {/* Sidebar Component (filters) has to be added*/}
        <h1>HELLO ALL PRODUCTS</h1>
        {this.props.allProducts.map(product => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
              {/* <AddToCartButton />  */}
            </div>
          )
        })}
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
