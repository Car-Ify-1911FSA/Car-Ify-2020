import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class AddNewProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: '',
      model: '',
      category: '',
      color: '',
      price: '',
      description: '',
      quantity: '',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpaOexXQpRpu85_Xz8xHnJOL6nycw-pZZ1bezgK1Fp8VptDdBk',
      condition: 'New'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('/api/products', this.state);
    } catch (error) {
      console.error(error);
    }
    this.props.handleButton();
  }

  render() {
    return (
      <div className="form-prod-cont">
        <form onSubmit={this.handleSubmit} className="form-prod">
          <h2>Add New Product:</h2>
          <label>
            Make:
            <input
              className="form-input"
              type="text"
              name="brand"
              onChange={this.handleChange}
              value={this.state.brand}
            />
          </label>
          <label>
            Model:
            <input
              className="form-input"
              type="text"
              name="model"
              onChange={this.handleChange}
              value={this.state.model}
            />
          </label>
          <label>
            Category:
            <input
              className="form-input"
              type="text"
              name="category"
              onChange={this.handleChange}
              value={this.state.category}
            />
          </label>
          <label>
            Color:
            <input
              className="form-input"
              type="text"
              name="color"
              onChange={this.handleChange}
              value={this.state.color}
            />
          </label>
          <label>
            Price:
            <input
              className="form-input"
              type="text"
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
            />
          </label>
          <label>
            Quantity:
            <input
              className="form-input"
              type="text"
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </label>
          <label>
            ImageUrl:
            <input
              className="form-input"
              type="text"
              name="imageUrl"
              onChange={this.handleChange}
              value={this.state.imageUrl}
            />
          </label>
          <label>
            Condition:
            <select
              className="form-input"
              value={this.state.condition}
              onChange={this.handleChange}
              name="condition"
            >
              <option>New</option>
              <option>Used</option>
            </select>
          </label>
          <label>
            Description:
            <input
              className="form-input"
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddNewProductForm;
