import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getActiveCart, addNewCart, loadAllProducts} from '../store';

class UserHome extends Component {
  componentDidMount() {
    this.props.fetchAllProds();
    if (this.props.userId) {
      Promise.all([this.props.getCart(this.props.userId)]).then(() => {
        if (!this.props.cartId) {
          const newCart = {
            status: 'active',
            time: Date(),
            userId: this.props.userId
          };
          this.props.addNewCart(this.props.userId, newCart);
        }
      });
    }
  }

  render() {
    const {name, isLoggedIn, allProduct} = this.props;

    return (
      <div className="homePageDiv">
        {isLoggedIn ? (
          <h3>
            Let's Keep on Shopping,{' '}
            <span className="hpLoggedInWelcome">{name}!</span>
          </h3>
        ) : (
          <h3>Remember to login or sign-up!</h3>
        )}

        <br />
        <div className="homePagePara">
          <p>
            Welcome to Car-Ify! Where your car shopping dreams can come true!
          </p>
        </div>
        <br />

        {isLoggedIn ? (
          <div>
            <span>Recent Purchases: </span>
          </div>
        ) : (
          ''
        )}

        <div className="homePageTop">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtjZMMofBIsAi4F2ESDUwjtcLz72t6O0C_FcajyCSm8LWQg5X8" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpaOexXQpRpu85_Xz8xHnJOL6nycw-pZZ1bezgK1Fp8VptDdBk" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTY_jTD1wj-EqDLJ3rD534a5cRNR4atMrzQrp__ytKIT0IrNaW" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    name: state.user.name,
    cartId: state.cart.id,
    allProduct: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getActiveCart(userId)),
    addNewCart: (userId, newCart) => dispatch(addNewCart(userId, newCart)),
    fetchAllProds: () => dispatch(loadAllProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

// PROP TYPES
UserHome.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string
};
