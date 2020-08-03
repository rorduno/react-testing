import React from 'react';
import { render } from '@testing-library/react';
import DogBreed from "./../../components/DogBreed";

test('renders with default values', () => {

    const { container } = render(<DogBreed breed={"chihuahua"} />);
    const tag = container.querySelector("p");

    expect(tag).not.toEqual(null);
    expect(tag).toHaveTextContent("chihuahua");
});
