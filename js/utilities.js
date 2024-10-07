// Fetch pet category
const fetchPetCategory = (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      return res.json();
    })
    .then((json) => createCategory(json.categories))
    .catch((err) => console.log(err));
};

// Fetch all pets
const fetchAllPets = (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      return res.json();
    })
    .then((json) => showLoadingState(json.pets))
    .catch((err) => console.log(err));
};
