import React from 'react';
import {connect} from 'react-redux';
import ListOfUsers from './ListOfUsers';
import ListOfAllProducts from './ListOfAllProducts';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: true,
      productList: false
    };
    this.handleProductsClick = this.handleProductsClick.bind(this);
    this.handleUsersClick = this.handleUsersClick.bind(this);
  }

  componentDidMount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
    const userBtn = document.querySelector('.addOneBtn');
    if (userBtn) {
      userBtn.focus();
    }
  }

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
  }

  handleUsersClick() {
    this.setState({productList: false, userList: true});
  }

  handleProductsClick() {
    this.setState({productList: true, userList: false});
  }

  render() {
    return (
      <div className="admin-page">
        <h1 className="administrator">Administrator</h1>
        <div className="twoNames">
          <button
            type="button"
            onClick={this.handleUsersClick}
            className="addOneBtn"
          >
            Users
          </button>
          <button
            type="button"
            onClick={this.handleProductsClick}
            className="addTwoBtn"
          >
            Products
          </button>
        </div>
        {this.state.userList ? <ListOfUsers /> : null}
        {this.state.productList ? <ListOfAllProducts /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

export default connect(mapStateToProps)(AdminHome);
