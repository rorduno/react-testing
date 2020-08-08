import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DogBreeds from "./../../components/DogBreeds";
import DogBreed from "./../../components/DogBreed";
import { fetchDogBreeds } from "./../../api";

jest.mock("./../../components/DogBreed");
jest.mock("./../../api");

describe("DogBreeds", () => {

    let buttons, fetchBtn, clearBtn;
    beforeEach(() => {
        render(<DogBreeds />);
        buttons = screen.queryAllByRole("button");
        fetchBtn = buttons[0]
        clearBtn = buttons[1];
    });

    it("renders with deafult values", () => {

        const errorMessage = screen.queryByTestId("error")

        expect(errorMessage).toEqual(null);
        expect(fetchBtn).not.toEqual(null);
        expect(clearBtn).not.toEqual(null);

        expect(fetchBtn).toHaveTextContent("Get dog breeds");
        expect(clearBtn).toHaveTextContent("Clear");
    });

    it("fires off successful request, shows loading, results, and clears screen when button clear is clicked", async () => {

        DogBreed.mockReturnValue(<p>doggy</p>).mockReturnValue(<p>doggy</p>);
        fetchDogBreeds.mockReturnValueOnce(Promise.resolve({ message: { dingo: [], husky: [] } }));

        fireEvent.click(fetchBtn);

        expect(fetchBtn).toHaveTextContent("Loading...");
        expect(fetchDogBreeds).toHaveBeenCalled();

        fetchBtn = await screen.findByText("Get dog breeds");

        let doggies = await screen.findAllByText("doggy");

        expect(doggies.length).toEqual(2);
        expect(fetchBtn).toHaveTextContent("Get dog breeds");

        fireEvent.click(clearBtn);

        doggies = screen.queryAllByText("doggy");
        expect(doggies).toEqual([]);
    
    });

    it("fires off unsuccessful request, populates errorMessage, and clears screen when button clear is clicked", async () => {

        fetchDogBreeds.mockReturnValueOnce(Promise.resolve({ errorMessage: "oops!" }));

        fireEvent.click(fetchBtn);

        expect(fetchBtn).toHaveTextContent("Loading...");
        expect(fetchDogBreeds).toHaveBeenCalled();

        fetchBtn = await screen.findByText("Get dog breeds");

        let errorMessage = await screen.findByText("oops!");

        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.tagName).toEqual("P");
        expect(fetchBtn).toHaveTextContent("Get dog breeds");

        fireEvent.click(clearBtn);

        errorMessage = screen.queryByText("oops!");

        expect(errorMessage).toEqual(null);
    });

});