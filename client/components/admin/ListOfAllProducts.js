import React from 'react';
import {connect} from 'react-redux';
import AddNewProductForm from './AddNewProductForm';
import {loadAllProducts} from '../../store';
import {Link} from 'react-router-dom';

class ListOfAllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showForm !== prevState.showForm) {
      this.props.fetchAllProducts();
    }
  }

  render() {
    const userId = this.props.userId;
    return (
      <div>
        <div>
          <h1 className="product-list">Product List</h1>
          <button
            type="button"
            onClick={this.handleButtonClick}
            className="addNewProd"
          >
            <Link to="/addNewProduct/${userId}" className="addNewProdText">
              Add New
            </Link>
          </button>
        </div>
        {this.state.showForm ? (
          <AddNewProductForm handleButton={this.handleButtonClick} />
        ) : null}
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
            {this.props.allProducts.map(product => {
              return (
                <div key={product.id} className="prod-list-row">
                  <img src={product.imageUrl} width="50px" />
                  <h4>{product.brand}</h4>
                  <h4>{product.model}</h4>
                  <h4>{product.color}</h4>
                  <h4>{product.price}</h4>
                  <h4>{product.quantity}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts,
    userId: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(loadAllProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfAllProducts);
