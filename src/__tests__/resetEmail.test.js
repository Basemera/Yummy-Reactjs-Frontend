import React from 'react';
import { shallow, enzyme } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import PasswordResetEmail from '../components/auth/resetEmail';

describe('Signup component', () => {
  const wrapper = shallow(<PasswordResetEmail />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders modal in divs', () => {
    expect(wrapper.find('div')).toHaveLength(6);
  });
  it('renders state initially', () => {
    expect(wrapper.state().email).toEqual('');
  });
  it('renders a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('has form fields', () => {
    expect(wrapper.find('[name="email"]')).toHaveLength(1);
    expect(wrapper.find('#sendemail')).toHaveLength(1);
  });

  it('Form email field update when state changes', () => {
    wrapper.setState({ email: 'mail' });
    expect(wrapper.find('[name="email"]').props().value).toEqual('mail');
  });
});
