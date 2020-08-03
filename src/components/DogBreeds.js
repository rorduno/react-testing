import React from "react";
import { fetchDogBreeds } from "../api";
import DogBreed from "./DogBreed";

const DogBreeds = () => {

  const [breeds, setBreeds] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFetchBreeds = async () => {

    setIsLoading(true);

    const results = await fetchDogBreeds();
    if (results.errorMessage) {
      setErrorMessage(results.errorMessage);
    } else {
      setBreeds(Object.keys(results.message));
    }

    setIsLoading(false);
  };

  const handleClearBreeds = () => {
    setBreeds([]);
    setErrorMessage(null);
  };

  const renderBreeds = () => {
    return breeds.map(breed => <DogBreed key={breed} breed={breed} />);
  };

  return (<div>
    {errorMessage ? <p>{errorMessage}</p> : null}
    <button onClick={handleFetchBreeds}>{isLoading ? "Loading..." : "Get dog breeds"}</button>
    <button onClick={handleClearBreeds}>Clear</button>
    {renderBreeds()}
  </div>
  );
};

export default DogBreeds;