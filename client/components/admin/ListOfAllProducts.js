import React from 'react';
import {connect} from 'react-redux';

const ListOfAllProducts = ({allProducts}) => {
  console.log(AllProducts);
  return <h1>Hello Products</h1>;
};

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfAllProducts);
