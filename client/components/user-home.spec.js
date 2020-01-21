/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserHome} from './user-home';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('UserHome', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserHome email="cody@email.com" />);
  });

  it('renders the email in an h3', () => {
    expect(wrapper.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  });
});
