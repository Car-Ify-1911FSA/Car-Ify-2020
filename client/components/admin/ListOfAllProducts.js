import React from 'react';
import {connect} from 'react-redux';

class ListOfAllProducts extends React.Component {
  componentDidMount() {}

  render() {
    console.log('PROPS ALLLLLL', this.props.allProducts);
    return <h1>Hello Products</h1>;
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfAllProducts);
