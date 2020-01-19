import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loadTop3} from '../store';
import ProductCard from './ProductCard';

class Top3Products extends Component {
  componentDidMount() {
    this.props.fetchTop3();
  }

  render() {
    console.log('PROPS FROM TOP3', this.props.top3);
    return (
      <div>
        <h2>TOP 3</h2>
        <div className="product-card-container">
          {this.props.top3.map(product => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    top3: state.top3Products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTop3: () => {
      dispatch(loadTop3());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Top3Products)
);
