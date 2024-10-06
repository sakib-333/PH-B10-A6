// Show active category
const showActiveCategory = (id) => {
  for (let i = 0; i < 4; i++) {
    document
      .querySelector(`#btn-category-${i + 1}`)
      .classList.remove("bg-teal-500");
  }
  document.querySelector(`#btn-category-${id}`).classList.add("bg-teal-500");
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
    div.addEventListener("click", () => showActiveCategory(id));
    document.querySelector("#pet-category").append(div);
  });
};
