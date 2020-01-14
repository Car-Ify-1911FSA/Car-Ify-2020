import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadAllProducts} from '../store/allProducts'
import ProductCard from './ProductCard'

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoadAllProducts()
  }

  render() {
    return (
      <div>
        {/* Sidebar Component (filters) has to be added*/}
        {this.props.allProducts.map(product => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
              {/* <BuyButton /> component has to be added*/}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.AllProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadAllProducts: () => {
      dispatch(loadAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
