import React from 'react';
import { shallow } from 'enzyme';
import DogBreed from "./../../components/DogBreed";

test('renders with default values', () => {

    const wrapper = shallow(<DogBreed breed={"chihuahua"} />);
    const tag = wrapper.find("p");

    expect(tag.length).toEqual(1); // element exists
    expect(tag.text()).toEqual("chihuahua"); // element has expected data
    expect(tag.hasClass("important-class")).toEqual(true); // element has expected class
});
