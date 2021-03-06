import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadAllProducts} from '../store';
import ProductCard from './ProductCard';

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchAllProducts();
  }

  filterAllProducts(allCars, newState) {
    return allCars.filter(car => {
      for (let key in newState) {
        if (newState[key] !== 'All' && car[key] !== newState[key]) return false;
      }
      return true;
    });
  }

  render() {
    const state = this.props.location.state,
      allCars = this.props.allProducts,
      newState = state ? state.state : false,
      filteredCars = this.filterAllProducts(allCars, newState);

    return (
      <div className="allProductFullDiv">
        <h1 className="inventory">Inventory</h1>
        <div className="product-card-container">
          {filteredCars.map(product => {
            return (
              <div key={product.id} className="productCardOutsideDiv">
                <ProductCard
                  product={product}
                  cartDetail={this.props.cartDetail}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts,
    cartDetail: state.cartProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(loadAllProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
