import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadAllProducts} from '../store/allProducts'

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
              <Link to={`/allcars/${product.id}`}>
                <img src={product.imageUrl} />
                <h4>{`${product.brand} ${product.model}`}</h4>
                <h3>{product.price}</h3>
                <h4>{product.rating}</h4>
              </Link>
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
