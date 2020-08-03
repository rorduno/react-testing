import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import DogBreeds from "./../../components/DogBreeds";
import DogBreed from "./../../components/DogBreed";
import { fetchDogBreeds } from "./../../api";

jest.mock("./../../components/DogBreed");
jest.mock("./../../api");

describe("DogBreeds", () => {

    let utils, buttons, fetchBtn, clearBtn;
    beforeEach(() => {
        utils = render(<DogBreeds />);
        buttons = utils.queryAllByRole("button");
        fetchBtn = buttons[0]
        clearBtn = buttons[1];
    });

    it("renders with deafult values", () => {

        const errorMessage = utils.container.querySelector("p");

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

        fetchBtn = await waitForElement(() =>
            utils.getByText("Get dog breeds")
        );
        let doggies = await waitForElement(() =>
            utils.container.querySelectorAll("p")
        );

        expect(doggies.length).toEqual(2);
        expect(fetchBtn).toHaveTextContent("Get dog breeds");

        fireEvent.click(clearBtn);

        doggies = utils.container.querySelectorAll("p")

        expect(doggies.length).toEqual(0);
    });

    it("fires off unsuccessful request, populates errorMessage, and clears screen when button clear is clicked", async () => {

        fetchDogBreeds.mockReturnValueOnce(Promise.resolve({ errorMessage: "oops!" }));

        fireEvent.click(fetchBtn);

        expect(fetchBtn).toHaveTextContent("Loading...");
        expect(fetchDogBreeds).toHaveBeenCalled();

        fetchBtn = await waitForElement(() =>
            utils.getByText("Get dog breeds")
        );

        let tags = await waitForElement(() =>
            utils.container.querySelectorAll("p")
        );

        expect(tags.length).toEqual(1);

        const errorMessage = tags[0];

        expect(errorMessage).toHaveTextContent("oops!");
        expect(fetchBtn).toHaveTextContent("Get dog breeds");

        fireEvent.click(clearBtn);

        tags = utils.container.querySelectorAll("p")

        expect(tags.length).toEqual(0);        
    });

});