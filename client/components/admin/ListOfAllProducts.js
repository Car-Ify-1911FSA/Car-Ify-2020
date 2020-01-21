import React from 'react';
import {connect} from 'react-redux';

const ListOfAllProducts = ({allProducts}) => {
  return (
    <div>
      <div>
        <h1>Product List:</h1>
        <button type="button">Add New</button>
      </div>
      <div className="prod-list-cont">
        <div className="prod-col">
          <h3>Image</h3>
          <h3>Make</h3>
          <h3>Model</h3>
          <h3>Color</h3>
          <h3>Price</h3>
          <h3>QTY</h3>
        </div>
        <div>
          {allProducts.map(product => {
            return (
              <div key={product.id} className="prod-list-row">
                <img src={product.imageUrl} width="50px" />
                <h4>{product.brand}</h4>
                <h4>{product.model}</h4>
                <h4>{product.color}</h4>
                <h4>{product.price}</h4>
                <h4>{product.quantity}</h4>
                <button type="button">edit</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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
