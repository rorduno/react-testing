import React from 'react';
import { render, screen } from '@testing-library/react';
import DogBreed from "./../../components/DogBreed";

test('renders with default values', () => {

    render(<DogBreed breed={"chihuahua"} />);
    
    const tag = screen.getByText("chihuahua");
    
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass("important-class");
});
