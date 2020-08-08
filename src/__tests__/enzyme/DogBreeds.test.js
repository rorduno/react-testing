import React from 'react';
import { shallow } from 'enzyme';
import DogBreeds from "./../../components/DogBreeds";
import { fetchDogBreeds } from "./../../api";
import DogBreed from '../../components/DogBreed';

jest.mock("./../../api");

const runAllPromises = () => {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve()
        })
    })
};

describe("DogBreeds", () => {

    let wrapper, buttons, fetchBtn, clearBtn;
    beforeEach(() => {
        wrapper = shallow(<DogBreeds />);
        buttons = wrapper.find("button");
        fetchBtn = buttons.at(0);
        clearBtn = buttons.at(1);
    });

    it("renders with deafult values", () => {

        const errorMessage = wrapper.find("p");

        expect(errorMessage.length).toEqual(0);
        expect(fetchBtn).not.toEqual(null);
        expect(clearBtn).not.toEqual(null);

        expect(fetchBtn.text()).toEqual("Get dog breeds");
        expect(clearBtn.text()).toEqual("Clear");
    });

    it("fires off successful request, shows loading, results, and clears screen when button clear is clicked", async () => {

        fetchDogBreeds.mockReturnValueOnce(Promise.resolve({ message: { dingo: [], husky: [] } }));

        fetchBtn.simulate("click");

        buttons = wrapper.find("button");
        fetchBtn = buttons.at(0);
        expect(fetchBtn.text()).toEqual("Loading...");

        await runAllPromises()

        // after waiting for all the promises to be exhausted
        // we can do our UI check
        wrapper.update()

        let doggies = wrapper.find(DogBreed);

        expect(doggies.length).toEqual(2);

        buttons = wrapper.find("button");
        fetchBtn = buttons.at(0);

        expect(fetchBtn.text()).toEqual("Get dog breeds");
        expect(fetchDogBreeds).toHaveBeenCalled();

        clearBtn.simulate("click");

        doggies = wrapper.find(DogBreed);

        expect(doggies.length).toEqual(0);

    });

    it("fires off unsuccessful request, populates errorMessage, and clears screen when button clear is clicked", async () => {

        fetchDogBreeds.mockReturnValueOnce(Promise.resolve({ errorMessage: "oops!" }));

        fetchBtn.simulate("click");

        await runAllPromises()

        // after waiting for all the promises to be exhausted
        // we can do our UI check
        wrapper.update()

        let doggies = wrapper.find(DogBreed);

        expect(doggies.length).toEqual(0);
        
        const errorMessage = wrapper.find("p");
        expect(errorMessage.text()).toEqual("oops!");

        buttons = wrapper.find("button");
        fetchBtn = buttons.at(0);

        expect(fetchBtn.text()).toEqual("Get dog breeds");
        expect(fetchDogBreeds).toHaveBeenCalled();

        clearBtn.simulate("click");

        doggies = wrapper.find(DogBreed);

        expect(doggies.length).toEqual(0);
        expect(errorMessage.text()).toEqual("oops!");
    });

});