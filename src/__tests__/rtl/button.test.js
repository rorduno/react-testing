import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from "./../../components/Button";

let btn;
beforeEach(()=>{
   render(<Button />);
   btn = screen.getByRole("button");
});

test('renders with default values', () => {
  expect(btn).not.toEqual(null);
  expect(screen.getByText("Count is 0")).toBeInTheDocument();
  });

test('increments counter by one', () => {
  
  fireEvent.click(btn);

  expect(screen.getByText("Count is 1")).toBeInTheDocument();
});
