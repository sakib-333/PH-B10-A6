// Liked pet
const likedPet = (image) => {
  document.querySelector("#liked-pets").classList.remove("hidden");

  document.querySelector("#liked-pets").innerHTML += `
    <img src=${image} class='w-full rounded-lg border p-2' alt='pet'/>
  `;
};

// Create pet card
const createPetCard = (pets) => {
  document.querySelector("#pet-showing-cards").innerHTML = "";

  const grid = document.querySelector("#pet-showing-cards");

  if (!pets.length) {
    grid.classList = "pets lg:w-5/6 h-fit text-center bg-slate-200 p-4 rounded-md";

    document.querySelector("#pet-showing-cards").innerHTML = `
      <img class='mx-auto' src='./images/error.webp' alt='error logo'/>
      <h1 class='text-2xl font-bold'>No Information Available</h1>
      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      its layout. The point of using Lorem Ipsum is that it has a.</p>
    `;
  } else {
    grid.classList =
      "pets lg:w-5/6 h-fit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4";

    pets.forEach((pet) => {
      const card = document.createElement("div");
      card.classList = "max-w-[275px] mx-auto border rounded-xl p-4 box-border";

      card.innerHTML = `
    <img class="w-full h-40 rounded-md" src=${pet.image} alt="pet" />
      <div>
        <h1 class="text-2xl font-bold">${pet.pet_name}</h1>
        <ul class='text-sm'>
          <li class="flex space-x-1">
            <img src="./images/svg/breed.svg" alt="breed" />
            <span>Breed: ${
              typeof pet.breed === "undefined" || pet.breed === null
                ? "Not available"
                : pet.breed
            }</span>
          </li>
          <li class="flex space-x-1">
            <img src="./images/svg/calender.svg" alt="calender" />
            <span>Birth: ${
              typeof pet.date_of_birth === "undefined" ||
              pet.date_of_birth === null
                ? "Not available"
                : pet.date_of_birth
            }</span>
          </li>
          <li class="flex space-x-1">
            <img src="./images/svg/gender.svg" alt="gender" />
            <span>Gender: ${
              typeof pet.gender === "undefined" || pet.gender === null
                ? "Not available"
                : pet.gender
            }</span>
          </li>
          <li class="flex space-x-1">
            <img src="./images/svg/price.svg" alt="price" />
            <span>Price : ${
              typeof pet.price === "undefined" || pet.price === null
                ? "Not available"
                : pet.price + "$"
            }</span>
          </li>
        </ul>
        <div class="divider"></div>
        <div class="flex items-center justify-between space-x-2">
          <button class="btn btn-sm btn-outline btn-accent" onClick='likedPet("${
            pet.image
          }")'>
            <img src="./images/svg/like.svg" alt="like" />
          </button>
          <button class="btn btn-sm btn-outline btn-accent">Adopt</button>
          <button class="btn btn-sm btn-outline btn-accent" onClick='fetchExpectedPet(${
            pet.petId
          })'>Details</button>
        </div>
      </div>
    `;
      document.querySelector("#pet-showing-cards").append(card);
    });
  }
};

// Show loading state
const showLoadingState = (pets) => {
  document.querySelector("#pet-showing-cards").classList =
    "pets lg:w-5/6 h-fit flex items-center justify-center";

  document.querySelector("#pet-showing-cards").innerHTML = `
    <span class="loading loading-bars loading-lg"></span>
  `;

  setTimeout(() => {
    createPetCard(pets);
  }, 2000);
};

// Show active category
const showActiveCategory = (id, category) => {
  for (let i = 0; i < 4; i++) {
    document
      .querySelector(`#btn-category-${i + 1}`)
      .classList.remove("bg-teal-500");
  }
  document.querySelector(`#btn-category-${id}`).classList.add("bg-teal-500");

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      return res.json();
    })
    .then((json) => showLoadingState(json.data))
    .catch((err) => console.log(err));
};

// Create category
const createCategory = (categories) => {
  categories.forEach(({ id, category, category_icon }) => {
    const div = document.createElement("div");
    div.classList =
      "flex items-center space-x-3 px-5 py-2 border rounded-xl hover:bg-teal-500 hover:text-white cursor-pointer";
    div.id = `btn-category-${id}`;

    div.innerHTML = `
        <img class='w-8' src=${category_icon}/> <span class='font-bold hidden md:inline'>${category}</span>
    `;
    div.addEventListener("click", () => showActiveCategory(id, category));
    document.querySelector("#pet-category").append(div);
  });
};

// Show pet in modal
const showPetInModal = (pet) => {
  const dialog = document.createElement("dialog");

  if (
    typeof document.querySelector("#modal-div").childNodes[0] !== "undefined"
  ) {
    document.querySelector("#modal-div").childNodes[0].remove();
  }

  dialog.id = "my_modal_4";
  dialog.classList = "modal p-4";

  dialog.innerHTML = `
    <div class="modal-box w-8/12 max-w-5xl">
        <img class='w-full rounded-md' src=${pet.image}/>
        <h3 class="text-lg font-bold">${pet.pet_name}!</h3>
        <div class='flex space-x-4'>
        <ul class='text-sm'>
          <li class="flex space-x-1">
            <img src="./images/svg/breed.svg" alt="breed" />
            <span>Breed: ${
              typeof pet.breed === "undefined" || pet.breed === null
                ? "Not available"
                : pet.breed
            }</span>
          </li>
          <li class="flex space-x-1">
            <img src="./images/svg/gender.svg" alt="gender" />
            <span>Gender: ${
              typeof pet.gender === "undefined" || pet.gender === null
                ? "Not available"
                : pet.gender
            }</span>
          </li>
          <li class="flex space-x-1">
            <img src="./images/svg/gender.svg" alt="gender" />
            <span>Vaccinated status: ${
              typeof pet.vaccinated_status === "undefined" ||
              pet.vaccinated_status === null
                ? "Not available"
                : pet.vaccinated_status
            }</span>
          </li>
        </ul>
        <ul>
          <li class="flex space-x-1">
            <img src="./images/svg/calender.svg" alt="calender" />
            <span>Birth: ${
              typeof pet.date_of_birth === "undefined" ||
              pet.date_of_birth === null
                ? "Not available"
                : pet.date_of_birth
            }</span>
          </li>
          <li class="flex space-x-1">
            <img src="./images/svg/price.svg" alt="price" />
            <span>Price : ${
              typeof pet.price === "undefined" || pet.price === null
                ? "Not available"
                : pet.price + "$"
            }</span>
          </li>
        </ul>
        </div>
        <div class="divider"></div>
        <div>
            <h1 class='font-bold'>Details Information</h1>
            <p>${pet.pet_details}</p>
        </div>
        <div class="modal-action">
        <form method="dialog" class='w-full'>
            <!-- if there is a button, it will close the modal -->
            <button class="btn w-full bg-teal-100">Close</button>
        </form>
        </div>
    </div>
  `;
  document.querySelector("#modal-div").append(dialog);
  my_modal_4.showModal();
};

// Fetch expected pet
const fetchExpectedPet = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      return res.json();
    })
    .then((json) => showPetInModal(json.petData))
    .catch((err) => console.log(err));
};
