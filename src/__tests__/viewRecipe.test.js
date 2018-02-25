import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';

import ViewRecipes from '../components/recipes/ViewRecipes';

describe('ViewRecipes component', () => {
  const wrapper = shallow(<ViewRecipes match={{ params: {} }} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders other components', () => {
    expect(wrapper.find('CreateRecipe')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(1);
    expect(wrapper.find('Search')).toHaveLength(1);
  });

  it('has a div', () => {
    expect(wrapper.find('div')).toHaveLength(4);
  });

  it('has initial states', () => {
    expect(wrapper.state().recipes).toEqual([]);
    expect(wrapper.state().Next_page).toEqual(null);
    expect(wrapper.state().Previous_page).toEqual(null);
    expect(wrapper.state().current_page).toEqual(null);
    expect(wrapper.state().total_pages).toEqual(null);
    expect(wrapper.state().total_Items).toEqual(null);
    expect(wrapper.state().searching).toEqual(false);
  });

  it('renders get recipes functions', () => {
    expect(wrapper.find('getRecipes')).toBeTruthy();
  });

  it('renders delete recipes functions', () => {
    expect(wrapper.find('deleteRecipes')).toBeTruthy();
  });

  it('renders delete recipes functions', () => {
    expect(wrapper.find('editRecipes')).toBeTruthy();
  });

  it('renders change page functions', () => {
    expect(wrapper.find('changePage')).toBeTruthy();
  });

  it('calls component did mount', () => {
    sinon.spy(ViewRecipes.prototype, 'componentDidMount');
    const fullWrapper = mount(<ViewRecipes match={{ params: {} }} />);
    expect(ViewRecipes.prototype.componentDidMount).toHaveProperty('callCount', 1);
    ViewRecipes.prototype.componentDidMount.restore();
  });
});
