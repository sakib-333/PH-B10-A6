fetchPetCategory("https://openapi.programming-hero.com/api/peddy/categories");

fetchAllPets("https://openapi.programming-hero.com/api/peddy/pets");

const shortPetsByPrice = (selectedPets) => {
  selectedPets.sort((petA, petB) => petB.price - petA.price);

  createPetCard(selectedPets);
};

document.querySelector("#btn-sort-by-price").addEventListener("click", () => {
  shortPetsByPrice(selectedPets);
});
