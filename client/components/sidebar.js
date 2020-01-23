import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadAllProducts} from '../store';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      brand: 'All',
      category: 'All',
      condition: 'All',
      price: 'All'
    };
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  handleBrandChange(evt) {
    const newBrand = evt.target.value;
    this.setState({brand: newBrand});
  }

  handleCategoryChange(evt) {
    const newCategory = evt.target.value;
    this.setState({category: newCategory});
  }

  handleConditionChange(evt) {
    const newCondition = evt.target.value;
    this.setState({condition: newCondition});
  }

  handlePriceChange(evt) {
    const newPrice = evt.target.value;
    this.setState({price: newPrice});
  }

  render() {
    const products = this.props.allProducts,
      brand = [],
      category = [],
      condition = [],
      price = [];

    products.forEach(car => {
      if (!brand.includes(car.brand)) brand.push(car.brand);
      if (!category.includes(car.category)) category.push(car.category);
      if (!condition.includes(car.condition)) condition.push(car.condition);
      if (!price.includes(car.price)) price.push(car.price);
    });

    return (
      <div className="sideBarDiv">
        <h4>Filter Your Search</h4>

        <div className="sideBarBrandDiv">
          <strong>Brand: </strong>
          <br />
          <select
            className="sideBarSelect"
            value={this.state.brand}
            onChange={this.handleBrandChange}
          >
            <option>All</option>
            {brand.map((idvBrand, idx) => (
              <option key={idx}>{idvBrand}</option>
            ))}
          </select>
        </div>

        <div className="sideBarCategoryDiv">
          <strong>Category: </strong>
          <br />
          <select
            className="sideBarSelect"
            value={this.state.category}
            onChange={this.handleCategoryChange}
          >
            <option>All</option>
            {category.map((idvCtgy, idx) => (
              <option key={idx}>{idvCtgy}</option>
            ))}
          </select>
        </div>

        <div className="sideBarConditionDiv">
          <strong>Condition: </strong>
          <br />
          <select
            className="sideBarSelect"
            value={this.state.condition}
            onChange={this.handleConditionChange}
          >
            <option>All</option>
            {condition.map((idvCndtn, idx) => (
              <option key={idx}>{idvCndtn}</option>
            ))}
          </select>
        </div>

        {/* <div className="sideBarPriceDiv">
          <strong>Price: </strong>
          <br />
          <select
            className="sideBarSelect"
            value={this.state.price}
            onChange={this.handlePriceChange}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div> */}

        <Link
          to={{
            pathname: '/allProducts',
            state: {state: this.state}
          }}
          className="sideBarSubmitBtn linkText"
        >
          Find Cars!
        </Link>
      </div>
    );
  }
}

// CONTAINER
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(loadAllProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
