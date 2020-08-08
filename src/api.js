const fetchDogBreeds = async () => {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        return await response.json();

    } catch (error) {
        return { errorMessage: "An error has occured :(" };
    }
};

export { fetchDogBreeds };