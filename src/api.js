const fetchDogBreeds = async () => {

    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    if (data && "success" === data.status) {
        return data;
    }

    return { errorMessage: "An error has occured :(" };
};

export { fetchDogBreeds };