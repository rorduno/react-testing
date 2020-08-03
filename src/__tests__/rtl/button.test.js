import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from "./../../components/Button";

let utils, btn;
beforeEach(()=>{
   utils  = render(<Button />);
   btn = utils.queryByRole("button"); // query returns null if not present
});

test('renders with default values', () => {
  expect(btn).not.toEqual(null);
  expect(utils.getByText("Count is 0")).toBeInTheDocument();
  });

test('increments counter by one', () => {
  
  fireEvent.click(btn);

  expect(utils.getByText("Count is 1")).toBeInTheDocument();
});
