import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableCart from './TableCart';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Cart Table', () => {
  let wrapper;

  beforeEach(() => {
    const testCart = [
      {
        cartId: 3,
        productId: 4,
        quantity: 1,
        totalPrice: 54000,
        brand: 'test',
        model: 'test',
        price: 20000,
        imageUrl: 'test'
      },
      {
        cartId: 3,
        productId: 1,
        quantity: 1,
        totalPrice: 34500,
        brand: 'test',
        model: 'test',
        price: 20000,
        imageUrl: 'test'
      },
      {
        cartId: 3,
        productId: 3,
        quantity: 2,
        totalPrice: 78000,
        brand: 'test',
        model: 'test',
        price: 20000,
        imageUrl: 'test'
      }
    ];

    wrapper = shallow(<TableCart userId={1} productDetail={testCart} />);
  });

  it('renders the right amount of rows in cart table', () => {
    let trCount = wrapper.find('tr');
    expect(trCount).to.have.length(1);
  });
});
