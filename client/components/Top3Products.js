import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loadTop3} from '../store';
import ProductCard from './ProductCard';

class Top3Products extends Component {
  constructor() {
    super();
    this.startDrag = this.startDrag.bind(this);
  }
  componentDidMount() {
    this.props.fetchTop3();
  }

  startDrag(ev) {
    ev.dataTransfer.setData('drag-item', this.props.dataItem);
  }

  render() {
    return (
      <div className="top3FullDiv">
        <h2 className="top3Header">Top Three</h2>
        <div className="product-card-container">
          {this.props.top3.map(product => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                cartDetail={this.props.cartDetail}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    top3: state.top3Products,
    cartDetail: state.cartProduct
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
