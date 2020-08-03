import React from 'react';
import { shallow } from 'enzyme';
import Button from "./../../components/Button";

let wrapper, btn;

beforeEach(() => {
    wrapper = shallow(<Button />);
    btn = wrapper.find("button");
});

test('renders with default values', () => {
    expect(btn.length).toEqual(1)
    expect(btn.text()).toEqual("Count is 0");
});

test('increments counter by one', () => {

    btn.simulate("click"); //this works too btn.props().onClick();

    btn = wrapper.find("button");

    expect(btn.text()).toEqual("Count is 1");
});
